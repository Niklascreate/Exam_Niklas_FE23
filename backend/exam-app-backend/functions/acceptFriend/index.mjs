import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const acceptFriend = async (event) => {
  try {
    const { userId, requesterId } = JSON.parse(event.body);

    if (!userId || !requesterId) {
      return sendError(400, { message: "userId och requesterId måste anges." });
    }
    
    const [userResult, requesterResult] = await Promise.all([
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: userId } })),
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: requesterId } })),
    ]);

    if (!userResult.Item || !requesterResult.Item) {
      return sendError(404, { message: "En eller båda användarna hittades inte." });
    }

    const user = userResult.Item;
    const updatedFriendRequests = (user.friendRequests || []).filter(req => req.from !== requesterId);

    await Promise.all([
      db.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: userId },
        UpdateExpression: "SET friends = list_append(if_not_exists(friends, :empty), :f), friendRequests = :updatedReqs",
        ExpressionAttributeValues: {
          ":f": [requesterId],
          ":empty": [],
          ":updatedReqs": updatedFriendRequests,
        }
      })),
      db.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: requesterId },
        UpdateExpression: "SET friends = list_append(if_not_exists(friends, :empty), :f)",
        ExpressionAttributeValues: {
          ":f": [userId],
          ":empty": [],
        }
      }))
    ]);

    return sendResponse(200, { message: "Vänförfrågan accepterad!" });

  } catch (error) {
    console.error("Fel vid acceptFriend:", error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
