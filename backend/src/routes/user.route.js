const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh_token", userController.refreshToken);
userRouter.get("/info", auth, userController.getUser);
userRouter.patch("/addCart", auth, userController.addCart);
userRouter.get("/history", auth, userController.history);

module.exports = userRouter;
