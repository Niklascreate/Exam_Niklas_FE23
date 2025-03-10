import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const addFriend = async (event) => {
    try {
        const { userId, friendId } = JSON.parse(event.body);

        if (!userId || !friendId) {
            return sendError(400, { message: "Både userId och friendId måste anges." });
        }

        if (userId === friendId) {
            return sendError(400, { message: "Du kan inte lägga till dig själv som vän." });
        }

        const userResult = await db.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id: userId }
        }));

        const friendResult = await db.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id: friendId }
        }));

        if (!userResult.Item || !friendResult.Item) {
            return sendError(404, { message: "En eller båda användarna hittades inte." });
        }

        const userFriends = userResult.Item.friends || [];
        if (userFriends.includes(friendId)) {
            return sendError(400, { message: "Ni är redan vänner." });
        }

        await db.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id: userId },
            UpdateExpression: "SET friends = list_append(if_not_exists(friends, :empty_list), :newFriend)",
            ExpressionAttributeValues: {
                ":newFriend": [friendId],
                ":empty_list": []
            }
        }));

        await db.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id: friendId },
            UpdateExpression: "SET friends = list_append(if_not_exists(friends, :empty_list), :newUser)",
            ExpressionAttributeValues: {
                ":newUser": [userId],
                ":empty_list": []
            }
        }));

        return sendResponse(200, { message: "Vänskap har lagts till!" });

    } catch (error) {
        console.error("Fel vid tillägg av vän:", error);
        return sendError(500, { message: "Serverfel. Försök igen senare." });
    }
};
