import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const logoutUser = async (event) => {
    try {
        let body;
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            return sendError(400, { message: "Ogiltig JSON i förfrågan." });
        }

        const { id } = body;

        if (!id) {
            return sendError(400, { message: "Användar-ID krävs." });
        }

        const command = new UpdateCommand({
            TableName: TABLE_NAME,
            Key: { id },
            UpdateExpression: "SET isLoggedIn = :false",
            ExpressionAttributeValues: {
                ":false": false,
            },
        });

        await db.send(command);

        return sendResponse(200, { message: "Utloggning lyckades." });

    } catch (error) {
        console.error('Fel vid utloggning:', error);
        return sendError(500, { message: `Serverfel: ${error.message}` });
    }
};
