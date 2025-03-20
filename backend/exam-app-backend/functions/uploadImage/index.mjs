import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { sendResponse, sendError } from "../../responses/index.mjs";

const region = process.env.AWS_REGION;
const s3 = new S3Client({ region });
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region }));
const bucketName = process.env.S3_BUCKET_NAME;

export const uploadImg = async (event) => {
    try {
        const { id } = event.pathParameters;
        const body = JSON.parse(event.body);
        const fileContent = Buffer.from(body.image, "base64");
        const fileName = `profile-pictures/${id}-${Date.now()}.png`;

        // S3 Uppladdningsparametrar
        const uploadParams = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: "image/png",
            ACL: "public-read",
        };

        // Ladda upp till S3
        await s3.send(new PutObjectCommand(uploadParams));

        // Generera bildens URL
        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        // Uppdatera DynamoDB med den nya bildens URL
        const updateParams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: { id },  // Ingen { S: id } behövs i DocumentClient
            UpdateExpression: "SET image = :image",
            ExpressionAttributeValues: { ":image": imageUrl },
            ReturnValues: "UPDATED_NEW",
        };

        await dynamo.send(new UpdateCommand(updateParams));

        return sendResponse(200, { message: "Uppladdning lyckades!", imageUrl });
    } catch (error) {
        console.error("Fel vid uppladdning:", error);
        return sendError(500, error);
    }
};
