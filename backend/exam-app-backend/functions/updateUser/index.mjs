import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { verifyJWT } from '../../utils/index.mjs';

const TABLE_NAME = 'LunaChat-users';

export const updateUser = async (event) => {
  try {
    const token = event.headers?.Authorization?.replace("Bearer ", "") || event.headers?.authorization?.replace("Bearer ", "");
    if (!token) return sendError(401, { message: "Ingen autentiseringstoken angiven." });

    const decoded = verifyJWT(token);
    if (!decoded?.email) return sendError(401, { message: "Ogiltig eller utgången token." });

    const body = event.body ? JSON.parse(event.body) : null;
    if (!body) return sendError(400, { message: "Ogiltig JSON eller body saknas." });

    const { email, interests } = body;
    if (decoded.email !== email) return sendError(403, { message: "Du har inte behörighet att ändra denna användares intressen." });
    if (!Array.isArray(interests) || interests.length === 0) return sendError(400, { message: "Intressen måste vara en icke-tom lista." });

    const user = await db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: decoded.id } }));
    if (!user.Item) return sendError(404, { message: "Användaren hittades inte." });

    const updatedUser = await db.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: decoded.id },
      UpdateExpression: "SET interests = :interests",
      ExpressionAttributeValues: { ":interests": interests },
      ReturnValues: "ALL_NEW",
    }));

    return sendResponse(200, { message: "Intressen uppdaterade!", updatedUser: updatedUser.Attributes });

  } catch (error) {
    console.error('Fel vid uppdatering av intressen:', error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
