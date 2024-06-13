import { Router } from "express";
import { getAutores, getAutor, createAutor, updateAutor, deleteAutor } from "../controllers/autorController.js";

const router = Router();

router.get("/autores", getAutores);
router.get("/autores/:id", getAutor);
router.post("/autores", createAutor);
router.patch("/autores/:id", updateAutor);
router.delete("/autores/:id", deleteAutor);

export default router;