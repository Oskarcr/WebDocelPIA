import { Color, deleteAttachment, FinishType, Furniture, JSON_MISSING_ID, JSON_NOT_FOUND, JSON_OK, JSON_SERVER_ERROR, QUERY_ACTIVE_ONLY, saveAttachment, uploader, UserRole, Validators } from "#DocelServer";
import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { authMiddleware, requireRole } from "../middlewares/auth.js";

const validator = Validators.furniture;

function furnitureToJSON(furniture) {
    return {
        id: furniture._id,
        colorName: furniture.color?.name,
        price: furniture.price,
        finishName: FinishType.toLabel(furniture.finish),
        name: furniture.name,
        imageUrl: furniture.imageUrl
    };
}

const furnitures = Router();

// Lista todos los muebles activos disponibles
furnitures.get("/all", async (req, res) => {
    try {
        const colors = await Furniture.find(QUERY_ACTIVE_ONLY);
        res.status(200).json(colors.map(a => furnitureToJSON(a)));
    } 
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene los detalles de un mueble especifico
furnitures.get("/:id", async (req, res) => {
    const { id } = req.params;

    if(!id) {
        res.status(400).json(JSON_MISSING_ID);
        return;
    }

    if(!isValidObjectId(id)) {
        res.status(404).json(JSON_NOT_FOUND);
        return;
    }

    try {
        const furniture = await Furniture.findById(id);

        if(!furniture) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        res.status(200).json(furnitureToJSON(furniture));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Agrega un nuevo mueble a la base de datos.
furnitures.post("/", authMiddleware, requireRole(UserRole.EMPLOYEE), uploader.single("img"), async (req, res) => {
    const file = req.file;

    if(!file) {
        res.status(400).json({ errors: ["No se subio una imagen"] });
        return;
    }
    
    const body = validator.parseBody(req.body);

    const errors = validator.validate(body);
    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(body, 
        "name", 
        "price", 
        "finishName",
        "colorName"
    );

    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const { name, colorName, finishName, price } = body;
    const finish = FinishType.fromLabel(finishName);

    try {
        const color = await Color.findOne({ name: colorName });

        if(!color) {
            res.status(400).json({ errors: ["El color no existe en los registros de base de datos."]});
            return;
        }

        const imageUrl = saveAttachment(file);

        const json = {
            color: color._id,
            price,
            finish,
            name,
            imageUrl
        };

        const furniture = await Furniture.create(json);
        
        const result = await Furniture.findById(furniture._id);
        res.status(200).json(furnitureToJSON(result));
        return;
    }
    catch(error) {
        console.log(error);
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Modifica un mueble.
furnitures.patch("/", authMiddleware, requireRole(UserRole.EMPLOYEE), uploader.single("img"), async (req, res) => {
    const file = req.file;

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
        const furniture = await Furniture.findById(id);

        if(!furniture) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        if(body.colorName) {
            const color = await Color.findOne({ name: body.colorName });
            if(!color) {
                res.status(404).json(JSON_NOT_FOUND);
                return;
            }
            body.color = color._id;
        }

        if(file) {
            const oldImageUrl = furniture.get("imageUrl");
            if(oldImageUrl) {
                deleteAttachment(oldImageUrl);
            }
            body["imageUrl"] = saveAttachment(file);
        }
        
        furniture.set(body);
        await furniture.save();

        const result = await Furniture.findById(id);
        res.status(200).json(furnitureToJSON(result));
    }
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Marca como inactivo un mueble
furnitures.delete("/:id", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    const { id } = req.params;

    if(!id) {
        res.status(400).json(JSON_MISSING_ID);
        return;
    }

    if(!isValidObjectId(id)) {
        res.status(404).json(JSON_NOT_FOUND);
        return;
    }

    try {
        const furniture = await Furniture.findById(id);

        if(!furniture) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        furniture.set("active", false);
        await furniture.save();

        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default furnitures;