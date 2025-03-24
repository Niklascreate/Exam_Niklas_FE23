import { db } from "../../services/index.mjs";
import { GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { sendResponse, sendError } from "../../responses/index.mjs";

const WALL_TABLE = "LunaChat-wall";
const USER_TABLE = "LunaChat-users";

export const getWallMessages = async () => {
  try {
    const result = await db.send(new ScanCommand({ TableName: WALL_TABLE }));
    const messages = result.Items || [];

    const messagesWithProfileImages = await Promise.all(
      messages.map(async (message) => {
        const userData = await db.send(new GetCommand({
          TableName: USER_TABLE,
          Key: { id: message.userId }
        }));

        const user = userData.Item;
        const profileImage = user?.profileImage || "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp";

        return {
          id: message.id,
          userId: message.userId,
          nickname: message.nickname,
          message: message.message,
          createdAt: message.createdAt,
          profileImage: profileImage,
        };
      })
    );

    messagesWithProfileImages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sendResponse(200, { messages: messagesWithProfileImages });

  } catch (error) {
    console.error("Fel vid hämtning av inlägg:", error);
    return sendError(500, { message: "Serverfel vid hämtning av inlägg." });
  }
};