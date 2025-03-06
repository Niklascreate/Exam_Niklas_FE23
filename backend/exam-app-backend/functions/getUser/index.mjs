import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';

export const handler = async (event) => {
    try {
        const { id } = event.pathParameters;

        if (!id) {
            return sendError(400, { message: 'ID måste anges i endpointen.' });
        }

        const result = await db.get({
            TableName: 'LunaChat-users',
            Key: { id } 
        });

        if (!result.Item) {
            return sendResponse(404, { message: 'Användaren hittades inte.' });
        }

        return sendResponse(200, result.Item);

    } catch (error) {
        return sendError(500, { message: `Fel vid hämtning av användare: ${error.message}` });
    }
};
