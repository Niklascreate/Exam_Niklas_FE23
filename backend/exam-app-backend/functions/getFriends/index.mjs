import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getFriends = async (event) => {
    try {
        const { userid } = event.pathParameters;

        if (!userid) {
            return sendError(400, { message: 'UserId krävs.' });
        }

        const command = new GetCommand({
            TableName: 'LunaChat-users',
            Key: { id: userid }
        });

        const result = await db.send(command);

        if (!result.Item) {
            return sendError(404, { message: 'Användaren hittades inte.' });
        }

        return sendResponse(200, { friends: result.Item.friends || [] });

    } catch (error) {
        console.error('Fel vid hämtning av vänner:', error);
        return sendError(500, { message: `Serverfel: ${error.message}` });
    }
};
