import url from "url";
import { UsersController } from "../controllers/users-controller.js";

export function usersRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if ((reqPath === "/api/users/register" && reqMethod === "POST")) {
    UsersController.signupUser(req, res);
  } else if ((reqPath === "api/users/login" && reqMethod === "POST")) {
    UsersController.loginUser(req, res);
  } else if ((reqPath === "api/users/info" && reqMethod === "GET")) {
    UsersController.getUserInfo(req, res);
  } else if ((reqPath === "api/users/logout")) {
    UsersController.logoutUser(req, res);
  }
}
