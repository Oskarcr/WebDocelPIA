import { Color, JSON_MISSING_ID, JSON_NOT_FOUND, JSON_OK, JSON_SERVER_ERROR, QUERY_ACTIVE_ONLY, UserRole } from "#DocelServer";
import { Router } from "express";
import { Validators } from "#DocelServer";
import { isValidObjectId } from "mongoose";
import { authMiddleware, requireRole } from "../middlewares/auth.js";
import requireId from "../middlewares/requireId.js";

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

// Devuelve una lista de todos los colores.
colors.get("/all", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    try {
        const colors = await Color.find(QUERY_ACTIVE_ONLY).sort({
            name: 1
        });

        res.status(200).json(colors.map(a => colorToJSON(a)));
    } catch (error) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});


// Obtiene un color en especifico mediante el id.
colors.get("/:id", authMiddleware, requireRole(UserRole.EMPLOYEE), requireId, async (req, res) => {
   const { id } = req.params;

    try {
        const color = await Color.findById(id);
        if (!color) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }
        res.json(colorToJSON(color));
    } 
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Agrega un nuevo color.
colors.post("/", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
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
        if(await Color.exists({ 
            hexReference,
            ...QUERY_ACTIVE_ONLY
        })) { 
            res.status(400).json({ 
                errors: ["Ya existe un color registrado con la misma tonalidad."]
            });
            return;
        }

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
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Modifica un color existente.
colors.patch("/", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    const id = req.body.id;

    if(!id) {
        res.status(400).json(JSON_MISSING_ID);
        return;
    }

    if(!isValidObjectId(id)) {
        res.status(404).json(JSON_NOT_FOUND);
        return;
    }

    const body = validator.parseBody(req.body);
    
    const errors = validator.validate(body);

    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    try {
        if(body.hexReference) {
            if(await Color.exists({ 
                _id: { $ne: id },
                hexReference: body.hexReference,
                ...QUERY_ACTIVE_ONLY 
            })) { 
                res.status(400).json({ 
                    errors: ["Ya existe un color registrado con la misma tonalidad."]
                });
                return;
            }
        }

        const color = await Color.findByIdAndUpdate(id, body, {
            returnDocument: "after"
        });

        if(!color) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

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

// Marca como inactivo un color.
colors.delete("/:id", authMiddleware, requireRole(UserRole.EMPLOYEE), requireId, async (req, res) => {
    const { id } = req.params;
    
    try {
        const color = await Color.findById(id);

        if(!color) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        color.set("active", false);
        await color.save();

        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default colors;