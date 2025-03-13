import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { verifyJWT } from '../../utils/index.mjs';

const TABLE_NAME = 'LunaChat-users';

export const updateUser = async (event) => {
  try {
    console.log("Event received:", event);

    const token = event.headers?.Authorization?.split(" ")[1];
    if (!token) {
      return sendError(401, { message: "Ingen autentiseringstoken angiven." });
    }

    const decoded = verifyJWT(token);
    if (!decoded || !decoded.email) {
      return sendError(401, { message: "Ogiltig eller utgången token." });
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return sendError(400, { message: "Ogiltig JSON i förfrågan." });
    }

    const { email, interests } = body;

    if (decoded.email !== email) {
      return sendError(403, { message: "Du har inte behörighet att ändra denna användares intressen." });
    }

    if (!email || !Array.isArray(interests)) {
      return sendError(400, { message: "E-post och en lista med intressen krävs." });
    }

    const updateParams = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { email },
      UpdateExpression: "SET interests = :interests",
      ExpressionAttributeValues: {
        ":interests": interests,
      },
      ReturnValues: "ALL_NEW",
    });

    const updatedUser = await db.send(updateParams);

    return sendResponse(200, {
      message: "Intressen uppdaterade!",
      updatedUser: updatedUser.Attributes,
    });

  } catch (error) {
    console.error('Fel vid uppdatering av intressen:', error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
