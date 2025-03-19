import { db } from '../../services/index.mjs';
import { v4 as uuidv4 } from 'uuid';

export const addWallMessage = async (event) => {
  try {
    const { userId, nickname, message } = JSON.parse(event.body);

    if (!userId || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User ID och meddelande krävs" }),
      };
    }

    const newPost = {
      id: uuidv4(),
      userId,
      nickname,
      message,
      createdAt: new Date().toISOString(),
    };

    await db.put({
      TableName: "LunaChat-wall",
      Item: newPost,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Inlägg sparat!", post: newPost }),
    };

  } catch (error) {
    console.error("Fel vid sparande av inlägg:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfel vid sparande av inlägg" }),
    };
  }
};