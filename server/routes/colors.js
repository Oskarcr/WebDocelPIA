import { Color } from "#DocelServer";
import { Router } from "express";

import { Validators } from "#DocelServer";

const validator = Validators.colors;

const colors = Router();

function colorToJSON(color) {
    return {
        name: color.name,
        hexReference: color.hexReference,
        basePrice: color.basePrice
    };
}

colors.get("/all", async (req, res) => {
    try {
        const colors = await Color.find().sort({
            name: -1
        });

        res.status(200).json(colors.map(a => colorToJSON(a)));
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor",
            error: error.message
        });
    }
});

colors.get("/:id", async (req, res) => {
    try {
        const color = await Color.findById(req.params.id);
        if (!color) {
            return res.status(404).json({
                message: "Color no encontrado"
            });
        }
        res.json(colorToJSON(color));
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor",
            error: error.message
        });
    }
});

colors.post("/", async (req, res) => {
    const errors = validator.validate(req.body);

    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(req.body, 
        "hexReference",
        "name",
        "price"
    );

    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const { hexReference, name, price } = req.body;

    try {
        const json = {
            name: name.toLowerCase(),
            hexReference,
            price
        };
        await Color.create(json);
        res.status(200).json(json);
    }
    catch(error) {
        res.status(400).json({ 
            errors: ["El color '" + hexReference + "' ya esta registrado."]
        });
    }
});

export default colors;