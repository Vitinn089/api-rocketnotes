// Arquivo tags.routes.js

import { Router } from "express";
import { TagsController } from "../controllers/TagsController.js"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";


const tagsRoutes = Router();
const tagsController = new TagsController()

tagsRoutes.get("/", ensureAuthenticated, tagsController.index)

export  { tagsRoutes }