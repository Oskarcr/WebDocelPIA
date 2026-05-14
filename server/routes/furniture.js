import { Validators } from "#DocelServer";
import { Router } from "express";

const validator = Validators.furniture;

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
    const errors = validator.validate(req.body);
    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(req.body, 
        "name", 
        "price", 
        "finishName"
    );

    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const name = req.body.name.trim();
    const { price, finishName } = req.body;

    res.status(200).json({
        name,
        price,
        finishName
    });
});

// Marca como inactivo un mueble
furniture.delete("/:id", async (req, res) => {
    const { id } = req.params;
});

export default furniture;