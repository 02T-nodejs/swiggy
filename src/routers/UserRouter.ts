import { Router, response } from "express";
import { UserController } from "../controllers/UserController";

class UserRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRouters();
    this.postRouters();
    this.putRouters();
    this.deleteRouters();
  }

  getRouters() {
    this.router.get("/login", UserController.login);
    this.router.get("/test", UserController.test1, UserController.test2);
  }
  postRouters() {}
  putRouters() {}
  deleteRouters() {}
}
export default new UserRouter().router;
