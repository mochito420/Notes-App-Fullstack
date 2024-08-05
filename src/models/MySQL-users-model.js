import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import mysql2 from "mysql2/promise";

const connection = await mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "18062002",
  database: "notesappdb",
});

export class MySQLUsersModel {
  static async registerUser({ input }) {
    const [username] = await connection.query(
      `SELECT username FROM users WHERE username = ?;`,
      [input.username]
    );

    if (username.length !== 0) throw new Error("This username alredy exist");

    const newUser = {
      fullname: input.fullname,
      username: input.username,
      password: input.password,
      id: uuidv4(),
      createdAt: new Date().toISOString().split("T")[0],
      profilePic: `https://avatar.iran.liara.run/public/${Math.floor(
        Math.random() * 100
      )}`,
    };

    try {
      const insertNewUser = await connection.query(
        `
        INSERT INTO users (fullname, username, password, id, profilePic, createdAt)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP())
        `,
        [
          newUser.fullname,
          newUser.username,
          newUser.password,
          newUser.id,
          newUser.profilePic,
        ]
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error registing user", error);
    }

    return newUser
  }

  static async loginUser({ input }) {}
}
