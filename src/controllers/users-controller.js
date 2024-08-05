import jwt from "jsonwebtoken";
import { jsonMiddelware } from "../utils/json-middelware.js";
import { MySQLUsersModel } from "../models/MySQL-users-model.js";

export class UsersController {
  static async signupUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;

      if (
        !input.hasOwnProperty("fullname") ||
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      )
        throw new Error("you have to fild all the fills");

      try {
        const newUser = await MySQLUsersModel.registerUser({ input });

        const token = jwt.sign({ userID: newUser.id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        res.writeHead(201, {
          "content-type": "application/json",
          "Set-Cookie": `token=${token}; httpOnly; Path=/`,
        });
        res.end(JSON.stringify({ newuser: newUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }

  static async loginUser(req, res) {
    jsonMiddelware(req, res, async () => {
      const input = req.body;
      if (
        !input.hasOwnProperty("username") ||
        !input.hasOwnProperty("password")
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "you have to fill all the filds" }));
        return;
      }

      try {
        const logUser = await MySQLUsersModel.loginUser({ input });

        const token = jwt.sign({ userID: logUser.id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });

        res.writeHead(201, {
          "content-type": "application/json",
          "Set-Cookie": `token=${token}; httpOnly; Path=/`,
        });
        res.end(JSON.stringify({ logUser }));
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: error.message }));
      }
    });
  }
}
