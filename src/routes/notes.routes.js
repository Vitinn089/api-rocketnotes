// Arquivo note.routes.js

import { Router } from "express";
import { NotesController } from "../controllers/NotesController.js"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const notesRoutes = Router();
const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)  // Adicionando middleware de autenticação ao routes de notas

notesRoutes.get("/", notesController.index)
notesRoutes.post("/", notesController.create)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

export  { notesRoutes }