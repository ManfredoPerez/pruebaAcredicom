import { Router } from "express";
import { getLibros, getLibro, createLibro, updateLibro, deleteLibro } from "../controllers/libroController.js";

const router = Router();

router.get("/libros", getLibros);
router.get("/libros/:id", getLibro);
router.post("/libros", createLibro);
router.patch("/libros/:id", updateLibro);
router.delete("/libros/:id", deleteLibro);

export default router;