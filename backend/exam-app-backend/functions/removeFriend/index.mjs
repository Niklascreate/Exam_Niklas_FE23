import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';

const TABLE_NAME = 'LunaChat-users';

export const removeFriend = async (event) => {
    try {
        const { userId, friendId } = JSON.parse(event.body);

        if (!userId || !friendId) {
            return sendError(400, { message: "Både userId och friendId måste anges." });
        }

        const userResult = await db.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id: userId }
        }));

        if (!userResult.Item) {
            return sendError(404, { message: "Användaren hittades inte." });
        }

        const updatedFriendsList = (userResult.Item.friends || []).filter(id => id !== friendId);

        await db.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id: userId },
            UpdateExpression: "SET friends = :updatedFriends",
            ExpressionAttributeValues: {
                ":updatedFriends": updatedFriendsList
            }
        }));

        const friendResult = await db.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id: friendId }
        }));

        if (!friendResult.Item) {
            return sendError(404, { message: "Vännen hittades inte." });
        }

        const updatedFriendList = (friendResult.Item.friends || []).filter(id => id !== userId);

        await db.send(new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id: friendId },
            UpdateExpression: "SET friends = :updatedFriends",
            ExpressionAttributeValues: {
                ":updatedFriends": updatedFriendList
            }
        }));

        return sendResponse(200, { message: "Vän har tagits bort!" });

    } catch (error) {
        console.error("Fel vid borttagning av vän:", error);
        return sendError(500, { message: "Serverfel. Försök igen senare." });
    }
};