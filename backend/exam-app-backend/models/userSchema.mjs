import { hashPassword, generateJWT } from "../utils/index.mjs";
import { validateUser } from "../validations/userValidation.mjs";

export class User {
  constructor({ id, username, email, password, createdAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password; // Anta att lösenordet redan är hashat
    this.createdAt = createdAt || new Date().toISOString();
  }

  // Statisk metod för att skapa en användare med hashat lösenord och token
  static async create({ id, username, email, password, createdAt }) {
    // Validera data innan användaren skapas
    const { error } = validateUser({ id, username, email, password, createdAt });
    if (error) {
      throw new Error(error.details[0].message); // Kasta fel om valideringen misslyckas
    }

    // Hasha lösenordet
    const hashedPassword = await hashPassword(password);

    // Skapa användaren
    const user = new User({
      id,
      username,
      email,
      password: hashedPassword,
      createdAt,
    });

    // Generera JWT-token
    const token = generateJWT({ id: user.id, username: user.username, email: user.email });

    // Returnera användaren och token
    return { user, token };
  }
}