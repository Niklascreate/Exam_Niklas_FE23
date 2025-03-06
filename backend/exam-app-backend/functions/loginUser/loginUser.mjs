import { sendResponseWithHeaders, sendError } from '../../responses/index.mjs';
import { db } from '../../services/index.mjs';
import bcrypt from 'bcryptjs';
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { generateJWT } from '../../utils/index.mjs';
import 'dotenv/config';

const TABLE_NAME = 'LunaChat-users';

export const handler = async (event) => {
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

    return sendResponseWithHeaders(200, {
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname
      }
    });

  } catch (error) {
    console.error("Fel vid inloggning:", error);
    return sendError(500, { message: "Serverfel. Försök igen senare." });
  }
};