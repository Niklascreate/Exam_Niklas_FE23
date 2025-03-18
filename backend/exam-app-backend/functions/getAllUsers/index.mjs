import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { ScanCommand } from "@aws-sdk/lib-dynamodb";

export const getAllUsers = async (event) => {
    try {
        const command = new ScanCommand({
            TableName: 'LunaChat-users'
        });

        const result = await db.send(command);

        if (!result.Items || result.Items.length === 0) {
            return sendResponse(404, { message: 'Inga användare hittades.' });
        }

        return sendResponse(200, { users: result.Items });

    } catch (error) {
        console.error('🚨 Fel vid hämtning av användare:', error);
        return sendError(500, { message: `Serverfel: ${error.message}` });
    }
};