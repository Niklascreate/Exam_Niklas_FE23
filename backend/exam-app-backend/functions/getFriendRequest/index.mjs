import { sendResponse, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import { GetCommand } from '@aws-sdk/lib-dynamodb';

const TABLE_NAME = 'LunaChat-users';

export const getFriendRequests = async (event) => {
  try {
    const { userId } = event.pathParameters;

    if (!userId) {
      return sendError(400, { message: "userId måste anges." });
    }

    console.log("Hämtar vänförfrågningar för userId:", userId);

    const userResult = await db.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: userId },
    }));

    if (!userResult.Item) {
      return sendError(404, { message: "Användaren hittades inte." });
    }

    const friendRequests = userResult.Item.friendRequests || [];

    const reMade = await Promise.all(
      friendRequests.map(async (request) => {
        const senderResult = await db.send(new GetCommand({
          TableName: TABLE_NAME,
          Key: { id: request.from },
        }));

        if (!senderResult.Item) {
          return {
            from: request.from,
            createdAt: request.createdAt,
            nickname: "Okänd",
            firstname: "Okänd",
            lastname: "Okänd",
            profileImage: "https://example.com/default-avatar.png",
          };
        }

        return {
          from: request.from,
          createdAt: request.createdAt,
          nickname: senderResult.Item.nickname,
          firstname: senderResult.Item.firstname,
          lastname: senderResult.Item.lastname,
          profileImage: senderResult.Item.profileImage || "https://example.com/default-avatar.png",
        };
      })
    );

    return sendResponse(200, { friendRequests: reMade });

  } catch (error) {
    console.error("Fel vid hämtning av vänförfrågningar:", error);
    return sendError(500, { message: `Serverfel: ${error.message}` });
  }
};
