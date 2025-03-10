import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { DeleteCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const deleteUser = async (event) => {
    try {
        const { id } = event.pathParameters;

        if (!id) {
            return sendError(400, { message: "Användar-ID måste anges i endpointen." });
        }
        
        const userResult = await db.send(new GetCommand({
            TableName: TABLE_NAME,
            Key: { id }
        }));

        if (!userResult.Item) {
            return sendError(404, { message: "Användaren hittades inte." });
        }

        await db.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { id }
        }));

        return sendResponse(200, { message: `Användaren med ID ${id} har tagits bort.` });

    } catch (error) {
        console.error("Fel vid borttagning av användare:", error);
        return sendError(500, { message: "Serverfel. Försök igen senare." });
    }
};
