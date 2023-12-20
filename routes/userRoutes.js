import express from "express";

import {
	userDeletetion,
	userLogin,
	userRegistraiton,
	userUpdate,
	accessUserProfile,
} from "../controllers/userControllers.js";
import { passwordHash } from "../middlewares/hashPassword.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

const userRouter = express.Router();

userRouter.post("/register", passwordHash, userRegistraiton);
userRouter.post("/login", userLogin);
userRouter.put("/update", userUpdate);
userRouter.delete("/delete", userDeletetion);
userRouter.get("/profile", jwtAuth, accessUserProfile);

export default userRouter;
