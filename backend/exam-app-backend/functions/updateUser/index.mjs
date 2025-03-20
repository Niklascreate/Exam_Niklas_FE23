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
    if (!decoded?.id) return sendError(401, { message: "Ogiltig eller utgången token." });

    const userId = event.pathParameters?.id;
    if (!userId) return sendError(400, { message: "Användar-ID saknas i URL:en." });

    if (decoded.id !== userId) return sendError(403, { message: "Du har inte behörighet att ändra denna profil." });

    const body = event.body ? JSON.parse(event.body) : null;
    if (!body) return sendError(400, { message: "Ogiltig JSON eller body saknas." });

    const { bio, interests, profileImage } = body;

    if (interests && (!Array.isArray(interests) || interests.length === 0)) {
      return sendError(400, { message: "Intressen måste vara en icke-tom lista." });
    }

    if (bio && typeof bio !== "string") {
      return sendError(400, { message: "Bio måste vara en textsträng." });
    }

    if (profileImage && typeof profileImage !== "string") {
      return sendError(400, { message: "Profilbilden måste vara en URL-sträng." });
    }

    const user = await db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: userId } }));
    if (!user.Item) return sendError(404, { message: "Användaren hittades inte." });

    let updateExpression = "SET";
    let expressionAttributeValues = {};

    if (interests) {
      updateExpression += " interests = :interests,";
      expressionAttributeValues[":interests"] = interests;
    }

    if (bio) {
      updateExpression += " bio = :bio,";
      expressionAttributeValues[":bio"] = bio;
    }

    if (profileImage) {
      updateExpression += " profileImage = :profileImage,";
      expressionAttributeValues[":profileImage"] = profileImage;
    }

    updateExpression = updateExpression.replace(/,$/, "");

    const updatedUser = await db.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: userId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    }));

    return sendResponse(200, { message: "Profil uppdaterad!", updatedUser: updatedUser.Attributes });

  } catch (error) {
    console.error('Fel vid uppdatering av profil:', error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
