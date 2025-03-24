import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'LunaChat-users';

export const deleteFriend = async (event) => {
  try {
    const requestBody = typeof event.body === "string" ? event.body : JSON.stringify(event.body);
    const { userId, friendId } = JSON.parse(requestBody);

    if (!userId || !friendId) {
      return sendError(400, { message: "Både userId och friendId krävs." });
    }

    if (userId === friendId) {
      return sendError(400, { message: "Ogiltig operation: du kan inte ta bort dig själv." });
    }

    const [userResult, friendResult] = await Promise.all([
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: userId } })),
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: friendId } }))
    ]);

    if (!userResult.Item || !friendResult.Item) {
      return sendError(404, { message: "En eller båda användarna hittades inte." });
    }

    const userFriends = userResult.Item.friends || [];
    const friendFriends = friendResult.Item.friends || [];

    const updatedUserFriends = userFriends.filter(id => id !== friendId);
    const updatedFriendFriends = friendFriends.filter(id => id !== userId);

    await Promise.all([
      db.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: userId },
        UpdateExpression: "SET friends = :updated",
        ExpressionAttributeValues: {
          ":updated": updatedUserFriends,
        },
      })),
      db.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: friendId },
        UpdateExpression: "SET friends = :updated",
        ExpressionAttributeValues: {
          ":updated": updatedFriendFriends,
        },
      }))
    ]);

    return sendResponse(200, { message: "Vän borttagen." });

  } catch (error) {
    console.error("Fel vid borttagning av vän:", error);
    return sendError(500, { message: `Serverfel: ${error.message}` });
  }
};
