// Arquivo user.routes.js

import { Router } from "express";
import multer from "multer";
import { UsersController } from "../controllers/UsersController.js"
import { UserAvatarController } from "../controllers/UserAvatarController.js"
import * as uploadConfig from "../configs/upload.js"

import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()


usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

export  { usersRoutes }