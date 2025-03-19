import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "LunaChat-connections"; 

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const connect = async (event) => {
    const connectionId = event.requestContext.connectionId;
    console.log(`Användare ansluten: ${connectionId}`);

    try {
        await db.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: { connectionId }
        }));
        return { statusCode: 200, body: "Ansluten till WebSocket." };
    } catch (error) {
        console.error("Fel vid lagring av connectionId:", error);
        return { statusCode: 500, body: "Fel vid anslutning till WebSocket." };
    }
};

export const disconnect = async (event) => {
    const connectionId = event.requestContext.connectionId;
    console.log(`Användare frånkopplad: ${connectionId}`);

    try {
        await db.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { connectionId }
        }));
        return { statusCode: 200, body: "Användare frånkopplad." };
    } catch (error) {
        console.error("Fel vid borttagning av connectionId:", error);
        return { statusCode: 500, body: "Fel vid frånkoppling från WebSocket." };
    }
};
