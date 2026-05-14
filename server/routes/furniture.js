import { Router } from "express";

const furniture = Router();

// Lista todos los muebles disponibles
furniture.get("/", async (req, res) => {

});

// Obtiene los detalles de un mueble especifico
furniture.get("/:id", async (req, res) => {
    const { id } = req.params;
});

// Agrega un nuevo mueble a la base de datos.
furniture.post("/", async (req, res) => {
    validator.validate({

    });
    const {
        name,
        price,
        imageUrl,
        approximateTime,
        description,
        finish
    } = req.body;
    if(typeof name !== "string") {
        res.status(400).send("El name debe ser de tipo string");
        return;
    }
    if(typeof price !== "number") {
        res.status(400).send("El name debe ser de tipo string");
        return;
    }
});

// Marca como inactivo un mueble
furniture.delete("/:id", async (req, res) => {
    const { id } = req.params;
});

export default furniture;