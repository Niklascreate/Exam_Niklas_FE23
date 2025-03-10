import { db } from "../services/index.mjs";
import { PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "LunaChat-connections"; // Skapa denna tabell i DynamoDB

export const connect = async (event) => {
    const connectionId = event.requestContext.connectionId;
    console.log(`✅ Användare ansluten: ${connectionId}`);

    try {
        await db.send(new PutCommand({
            TableName: TABLE_NAME,
            Item: { connectionId }
        }));
    } catch (error) {
        console.error("Fel vid lagring av connectionId:", error);
    }

    return { statusCode: 200, body: "Ansluten till WebSocket." };
};

export const disconnect = async (event) => {
    const connectionId = event.requestContext.connectionId;
    console.log(`Användare frånkopplad: ${connectionId}`);

    try {
        await db.send(new DeleteCommand({
            TableName: TABLE_NAME,
            Key: { connectionId }
        }));
    } catch (error) {
        console.error("Fel vid borttagning av connectionId:", error);
    }

    return { statusCode: 200, body: "Användare frånkopplad." };
};
