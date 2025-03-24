import { db } from "../../services/index.mjs";
import { v4 as uuidv4 } from "uuid";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { sendResponse, sendError } from "../../responses/index.mjs";

const WALL_TABLE = "LunaChat-wall";
const USER_TABLE = "LunaChat-users";

export const addWallMessage = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const { userId, message } = body;

    if (!userId || !message || message.trim() === "") {
      return sendError(400, { message: "User ID och ett icke-tomt meddelande krävs." });
    }

    const userData = await db.send(new GetCommand({
      TableName: USER_TABLE,
      Key: { id: userId }
    }));

    const user = userData.Item;
    if (!user) return sendError(404, { message: "Användaren hittades inte." });

    const profileImage = user.profileImage || "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp";
    const nickname = user.nickname || "okänd";

    const newPost = {
      id: uuidv4(),
      userId,
      nickname,
      profileImage,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    await db.send(new PutCommand({
      TableName: WALL_TABLE,
      Item: newPost,
    }));

    return sendResponse(200, { message: "Inlägg sparat!", post: newPost });

  } catch (error) {
    console.error("Fel vid sparande av inlägg:", error);
    return sendError(500, { message: `Serverfel: ${error.message}` });
  }
};

