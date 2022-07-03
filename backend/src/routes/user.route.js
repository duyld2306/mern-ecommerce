const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");

userRouter.post("/register", userController.register);
userRouter.get("/refresh_token", userController.refreshToken);

module.exports = userRouter;
