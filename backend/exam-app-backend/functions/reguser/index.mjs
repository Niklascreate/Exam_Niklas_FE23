import { db } from '../service/dbService.mjs'; // DynamoDB-klient
import { User } from '../models/userSchema.mjs'; // Användarmodell
import { sendResponse, sendError } from '../utils/response.mjs'; // Response-funktioner
import { generateJWT } from '../../utils/index.mjs'; // JWT-funktioner

const TABLE_NAME = 'Lunachatusers'; // Tabellnamn

export const registerUser = async (event) => {
  try {
    // Parsar inkommande body
    const body = JSON.parse(event.body);

    // Kontrollera om e-post redan finns
    const checkEmailParams = {
      TableName: TABLE_NAME,
      IndexName: 'email-index', // Förutsätter att det finns ett GSI för email
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': body.email,
      },
    };

    const existingUser = await db.query(checkEmailParams);
    if (existingUser.Items && existingUser.Items.length > 0) {
      return sendResponse(400, { message: 'E-postadressen är redan registrerad.' });
    }

    // Skapa ny användare med hashat lösenord
    const { user, token } = await User.create({
      id: Date.now().toString(), // Använd ett tidsbaserat ID
      username: body.username,
      email: body.email,
      password: body.password,
    });

    // Spara användaren i DynamoDB
    const saveParams = {
      TableName: TABLE_NAME,
      Item: user,
    };

    await db.put(saveParams);

    // Skicka svar med användare och JWT-token
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
