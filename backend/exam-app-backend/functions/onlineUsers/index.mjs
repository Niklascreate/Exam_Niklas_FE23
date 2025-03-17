import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const onlineUsers = async (event) => {
    try {
        const command = new ScanCommand({
            TableName: TABLE_NAME,
            FilterExpression: "isLoggedIn = :true",
            ExpressionAttributeValues: {
                ":true": true,
            },
        });

        const result = await db.send(command);

        if (!result.Items || result.Items.length === 0) {
            return sendResponse(404, { message: 'Inga inloggade användare hittades.' });
        }

        return sendResponse(200, { users: result.Items });

    } catch (error) {
        console.error('Fel vid hämtning av inloggade användare:', error);
        return sendError(500, { message: `Serverfel: ${error.message}` });
    }
};