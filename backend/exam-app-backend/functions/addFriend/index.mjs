import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'LunaChat-users';

export const addFriend = async (event) => {
  try {
    const requestBody = typeof event.body === "string" ? event.body : JSON.stringify(event.body);
    const { userId, friendId } = JSON.parse(requestBody);

    if (!userId || !friendId) {
      return sendError(400, { message: "Både userId och friendId måste anges." });
    }

    if (userId === friendId) {
      return sendError(400, { message: "Du kan inte skicka en förfrågan till dig själv." });
    }

    const [userResult, friendResult] = await Promise.all([
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: userId } })),
      db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id: friendId } })),
    ]);
    
    if (!userResult.Item || !friendResult.Item) {
      return sendError(404, { message: "En eller båda användarna hittades inte." });
    }

    const friendRequests = friendResult.Item.friendRequests || [];
    const alreadySent = friendRequests.find(req => req.from === userId);

    if (alreadySent) {
      return sendError(400, { message: "Du har redan skickat en vänförfrågan." });
    }

    await db.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: friendId },
      UpdateExpression: "SET friendRequests = list_append(if_not_exists(friendRequests, :empty_list), :req)",
      ExpressionAttributeValues: {
        ":req": [{ from: userId, createdAt: new Date().toISOString() }],
        ":empty_list": [],
      }
    }));

    return sendResponse(200, { message: "Vänförfrågan skickad!" });

  } catch (error) {
    console.error("Fel vid vänförfrågan:", error);
    return sendError(500, { message: `Serverfel: ${error.message}` });
  }
};
