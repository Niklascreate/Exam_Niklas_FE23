import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'LunaChat-users';

export const dontAcceptFriend = async (event) => {
  try {
    const { userId, requesterId } = JSON.parse(event.body);

    if (!userId || !requesterId) {
      return sendError(400, { message: "userId och requesterId måste anges." });
    }

    console.log("Avvisar vänförfrågan från:", requesterId, "för:", userId);

    const userResult = await db.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: userId },
    }));

    if (!userResult.Item) {
      return sendError(404, { message: "Användaren hittades inte." });
    }

    const friendRequests = userResult.Item.friendRequests || [];
    const updatedRequests = friendRequests.filter(req => req.from !== requesterId);

    await db.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: userId },
      UpdateExpression: "SET friendRequests = :updatedRequests",
      ExpressionAttributeValues: {
        ":updatedRequests": updatedRequests,
      }
    }));

    return sendResponse(200, { message: "Vänförfrågan avvisad." });

  } catch (error) {
    console.error("Fel vid avvisning av vänförfrågan:", error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
