import { Color, uploader } from "#DocelServer";
import { Router } from "express";

import { Validators } from "#DocelServer";
import { JSON_SERVER_ERROR } from "../../constants.js";

const validator = Validators.colors;

const colors = Router();

function colorToJSON(color) {
    return {
        name: color.name,
        hexReference: color.hexReference,
        basePrice: color.basePrice,
        id: color._id
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
    const body = validator.parseBody(req.body);

    const errors = validator.validate(body);

    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(body, 
        "hexReference",
        "name",
        "basePrice"
    );

    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const { hexReference, name, basePrice } = body;

    try {
        const json = {
            name,
            hexReference,
            basePrice,
        };
        const color = new Color(json);
        await color.save();
        
        res.status(200).json({
            ...json,
            id: color._id
        });
    }
    catch(error) {
        res.status(400).json({ 
            errors: ["El color '" + hexReference + "' ya esta registrado."]
        });
    }
});

colors.patch("/", async (req, res) => {
    const body = validator.parseBody(req.body);
    const id = req.body.id;

    const errors = validator.validate(body);

    if(!id) errors.push("La id no fue especificada");

    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    try {
        const color = await Color.findByIdAndUpdate(id, body);
        color.save();

        const json = {
            id,
            ...body
        };

        res.status(200).json(json);
    }
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default colors;