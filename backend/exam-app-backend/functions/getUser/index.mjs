import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getUser = async (event) => {
    try {
        const { id } = event.pathParameters;

        if (!id) {
            return sendError(400, { message: 'ID måste anges i endpointen.' });
        }

        const params = new GetCommand({
            TableName: 'LunaChat-users',
            Key: { id }
        });

        const result = await db.send(params);

        if (!result.Item) {
            return sendResponse(404, { message: 'Användaren hittades inte.' });
        }

        const userData = {
            ...result.Item,
            interests: result.Item.interests || []
        };

        return sendResponse(200, { user: userData });

    } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
        return sendError(500, { message: `Fel vid hämtning av användare: ${error.message}` });
    }
};
