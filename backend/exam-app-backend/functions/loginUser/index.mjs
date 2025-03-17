import { sendResponseWithHeaders, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import bcrypt from 'bcryptjs';
import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { generateJWT } from '../../utils/index.mjs';

const TABLE_NAME = 'LunaChat-users';

export const loginUser = async (event) => {
  try {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return sendError(400, { message: "Ogiltig JSON i förfrågan." });
    }

    const { nickname, password } = body;

    if (!nickname || !password) {
      return sendError(400, { message: "Både användarnamn (nickname) och lösenord måste anges." });
    }

    const checkUserQuery = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'nickname-index',
      KeyConditionExpression: 'nickname = :nickname',
      ExpressionAttributeValues: {
        ':nickname': nickname,
      },
    });

    const existingUser = await db.send(checkUserQuery);

    if (!existingUser.Items || existingUser.Items.length === 0) {
      return sendError(401, { message: "Fel användarnamn eller lösenord." });
    }

    const user = existingUser.Items[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(401, { message: "Fel användarnamn eller lösenord." });
    }

    const token = generateJWT({ id: user.id, nickname: user.nickname });

    const updateUserStatus = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: user.id },
      UpdateExpression: "SET isLoggedIn = :true, lastLogin = :now",
      ExpressionAttributeValues: {
        ":true": true,
        ":now": new Date().toISOString(),
      },
    });

    await db.send(updateUserStatus);

    return sendResponseWithHeaders(200, {
      message: "Login lyckades",
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        lastLogin: new Date().toISOString(),
      }
    });

  } catch (error) {
    console.error("Fel vid inloggning:", error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};
