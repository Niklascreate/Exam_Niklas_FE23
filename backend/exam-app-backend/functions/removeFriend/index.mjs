import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';

const TABLE_NAME = 'LunaChat-users';

const getUser = async (id) => {
    const result = await db.send(new GetCommand({ TableName: TABLE_NAME, Key: { id } }));
    return result.Item || null;
};

const updateFriendsList = async (userId, removeId) => {
    const user = await getUser(userId);
    if (!user) return null;
    
    const updatedFriends = (user.friends || []).filter(id => id !== removeId);
    await db.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: userId },
        UpdateExpression: "SET friends = :friends",
        ExpressionAttributeValues: { ":friends": updatedFriends }
    }));

    return true;
};

export const removeFriend = async (event) => {
    try {
        const { userId, friendId } = JSON.parse(event.body);
        if (!userId || !friendId) return sendError(400, { message: "Både userId och friendId måste anges." });

        if (!(await updateFriendsList(userId, friendId))) return sendError(404, { message: "Användaren hittades inte." });
        if (!(await updateFriendsList(friendId, userId))) return sendError(404, { message: "Vännen hittades inte." });

        return sendResponse(200, { message: "Vän har tagits bort!" });

    } catch (error) {
        console.error("Fel vid borttagning av vän:", error);
        return sendError(500, { message: "Serverfel. Försök igen senare." });
    }
};
