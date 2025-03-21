import { db } from '../../services/index.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getFriends = async (event) => {
    try {
        const { userid } = event.pathParameters;

        if (!userid) {
            return sendError(400, { message: 'UserId krävs.' });
        }
        
        const userCommand = new GetCommand({
            TableName: 'LunaChat-users',
            Key: { id: userid }
        });

        const userResult = await db.send(userCommand);

        if (!userResult.Item) {
            return sendError(404, { message: 'Användaren hittades inte.' });
        }

        const friendsIds = userResult.Item.friends || [];
        let friendsData = [];

        for (const friendId of friendsIds) {
            const friendCommand = new GetCommand({
                TableName: 'LunaChat-users',
                Key: { id: friendId }
            });

            const friendResult = await db.send(friendCommand);

            if (friendResult.Item) {
                friendsData.push({
                    userId: friendResult.Item.id,
                    nickname: friendResult.Item.nickname,
                    firstname: friendResult.Item.firstname || "Okänd",
                    lastname: friendResult.Item.lastname || "Okänd",
                    profileImage: friendResult.Item.profileImage && friendResult.Item.profileImage !== "" 
                        ? friendResult.Item.profileImage 
                        : "https://lunarchat-profile-images.s3.eu-north-1.amazonaws.com/profile-pictures/maskot2+(2).webp",
                    createdAt: friendResult.Item.createdAt 
                        ? new Date(friendResult.Item.createdAt).toISOString() 
                        : null, 
                });
            }
        }

        return sendResponse(200, { friends: friendsData });

    } catch (error) {
        console.error('Fel vid hämtning av vänner:', error);
        return sendError(500, { message: `Serverfel: ${error.message}` });
    }
};
