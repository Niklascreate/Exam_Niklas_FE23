import { hashPassword, generateJWT } from "../utils/index.mjs";
import { validateUser } from "./userValidation.mjs";

export class User {
  constructor({ id, firstname, lastname, nickname, email, password, createdAt }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.nickname = nickname;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static async create({ id, firstname, lastname, nickname, email, password, createdAt }) {
    const { error } = validateUser({ id, firstname, lastname, nickname, email, password, createdAt });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      id,
      firstname,
      lastname,
      nickname,
      email,
      password: hashedPassword,
      createdAt,
    });

    const token = generateJWT({ id: user.id, firstname: user.firstname, lastname: user.lastname, email: user.email });

    return { user, token };
  }
}
