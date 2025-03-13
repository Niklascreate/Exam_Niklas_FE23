import { db } from '../../services/index.mjs';
import { User } from '../../models/userSchema.mjs';
import { sendResponse, sendError } from '../../responses/index.mjs';
import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = 'LunaChat-users';

export const regUser = async (event) => {
  try {
    console.log("Event received:", event);

    let body;
    try {
      body = JSON.parse(event.body);
    } catch (error) {
      return sendError(400, { message: "Ogiltig JSON i förfrågan." });
    }

    const { firstname, lastname, nickname, email, password } = body;
    if (!firstname || !lastname || !nickname || !email || !password) {
      return sendError(400, { message: "Alla fält måste vara ifyllda (firstname, lastname, nickname, email, password)." });
    }

    const nameRegex = /^[a-zA-ZåäöÅÄÖ\s-]+$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      return sendError(400, { message: "Förnamn och efternamn får endast innehålla bokstäver, bindestreck och mellanslag." });
    }

    const checkExistingEmail = new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    });

    const existingUser = await db.send(checkExistingEmail);
    if (existingUser.Items && existingUser.Items.length > 0) {
      return sendResponse(400, { message: 'E-postadressen är redan registrerad.' });
    }

    const { user, token } = await User.create({
      id: Date.now().toString(),
      firstname,
      lastname,
      nickname,
      email,
      password,
      friends: [],
      interests: []
    });

    const saveParams = new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    });

    await db.send(saveParams);

    return sendResponse(201, {
      message: 'Användare registrerad!',
      user,
      token,
    });
  } catch (error) {
    console.error('Fel vid registrering av användare:', error);
    return sendError(500, { message: 'Serverfel. Försök igen senare.' });
  }
};
