import { Color, deleteAttachment, FinishType, Furniture, saveAttachment, uploader, Validators } from "#DocelServer";
import { Router } from "express";
import { JSON_NOT_FOUND, JSON_SERVER_ERROR } from "../../constants.js";

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

// Lista todos los muebles disponibles
furnitures.get("/all", async (req, res) => {
    try {
        const colors = await Furniture.find().populate("color", "name");
        res.status(200).json(colors.map(a => furnitureToJSON(a)));
    } 
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene los detalles de un mueble especifico
furnitures.get("/:id", async (req, res) => {
    const { id } = req.params;
});

// Agrega un nuevo mueble a la base de datos.
furnitures.post("/", uploader.single("img"), async (req, res) => {
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
        
        const result = await Furniture.findById(furniture._id).populate("color", "name");
        res.status(200).json(furnitureToJSON(result));
        return;
    }
    catch(error) {
        console.log(error);
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

furnitures.patch("/", uploader.single("img"), async (req, res) => {
    const file = req.file;

    const body = validator.parseBody(req.body);
    const id = req.body.id;

    const errors = validator.validate(body);

    if(!id) errors.push("La id no fue especificada");

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

        const result = await Furniture.findById(id).populate("color", "name");
        res.status(200).json(furnitureToJSON(result));
    }
    catch (_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Marca como inactivo un mueble
furnitures.delete("/:id", async (req, res) => {
    const { id } = req.params;
});

export default furnitures;