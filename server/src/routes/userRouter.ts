import { Router } from "express";
import { registerController } from "../controllers/register";
import { loginController } from "../controllers/login";
import { logoutController } from "../controllers/logout";
import { getUserInfo, updateUserInfo } from "../controllers/userInfo";
import { protect } from "../middleware/authMiddleware";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.delete("/logout", logoutController);
userRouter
  .route("/profile")
  .get(protect, getUserInfo)
  .put(protect, updateUserInfo);
export default userRouter;
