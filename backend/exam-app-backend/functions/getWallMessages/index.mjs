import { db } from '../../services/index.mjs';

export const getWallMessages = async () => {
  try {
    const result = await db.scan({
      TableName: "LunaChat-wall",
    });

    const formattedMessages = result.Items.map(({ nickname, message, createdAt }) => ({
      nickname,
      message,
      createdAt
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ messages: formattedMessages }),
    };

  } catch (error) {
    console.error("Fel vid hämtning av inlägg:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Serverfel vid hämtning av inlägg" }),
    };
  }
};
