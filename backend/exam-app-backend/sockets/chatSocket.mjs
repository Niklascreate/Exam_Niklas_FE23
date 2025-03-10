import { db } from "../services/index.mjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import AWS from "aws-sdk";
import 'dotenv/config';

const apiGateway = new AWS.ApiGatewayManagementApi({
    endpoint: process.env.WEBSOCKET_ENDPOINT
});

export const sendMessage = async (event) => {
    try {
        const { senderId, receiverId, message } = JSON.parse(event.body);

        // Hämta mottagarens connectionId från DynamoDB
        const receiverData = await db.send(new GetCommand({
            TableName: "LunaChat-connections",
            Key: { connectionId: receiverId }
        }));

        if (!receiverData.Item) {
            console.log(`Mottagaren (${receiverId}) är inte online.`);
            return { statusCode: 404, body: "Mottagaren är inte online." };
        }

        const receiverConnectionId = receiverData.Item.connectionId;

        await apiGateway.postToConnection({
            ConnectionId: receiverConnectionId,
            Data: JSON.stringify({ senderId, message })
        }).promise();

        console.log(`📨 Meddelande från ${senderId} till ${receiverId}: ${message}`);
        return { statusCode: 200, body: "Meddelande skickat." };

    } catch (error) {
        console.error("Fel vid skickande av meddelande:", error);
        return { statusCode: 500, body: "Fel vid skickande av meddelande." };
    }
};

export const typing = async (event) => {
    try {
        const { senderId, receiverId } = JSON.parse(event.body);
        const receiverConnectionId = users.get(receiverId);

        if (receiverConnectionId) {
            await apiGateway.postToConnection({
                ConnectionId: receiverConnectionId,
                Data: JSON.stringify({ typing: true, senderId })
            }).promise();

            console.log(`Användare ${senderId} skriver till ${receiverId}`);
            return { statusCode: 200, body: "Skriv-indikator skickad." };
        } else {
            console.log(`Mottagaren (${receiverId}) är inte online.`);
            return { statusCode: 404, body: "Mottagaren är inte online." };
        }
    } catch (error) {
        console.error("Fel vid skickande av skriv-indikator:", error);
        return { statusCode: 500, body: "Fel vid skickande av skriv-indikator." };
    }
};
