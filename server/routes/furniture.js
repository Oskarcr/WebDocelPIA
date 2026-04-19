import { Router } from "express";

const furniture = Router();

// Lista todos los muebles disponibles
furniture.get("/", async (req, res) => {

});

// Visualiza los detalles del mueble especifico
furniture.get("/:id", async (req, res) => {
    const { id } = req.params;
});

// Agrega un nuevo mueble al catalogo
furniture.post("/", async (req, res) => {

});

// Marca como inactivo un mueble
furniture.delete("/:id", async (req, res) => {
    const { id } = req.params;
});

export default furniture;