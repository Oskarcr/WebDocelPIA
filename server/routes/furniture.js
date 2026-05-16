import { Color, FinishType, Furniture, saveAttachment, uploader, Validators } from "#DocelServer";
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
furniture.post("/", uploader.single("img"), async (req, res) => {
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

        await Furniture.create(json);

        res.status(200).json(json);
        return;
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            errors: ["Error del servidor"]
        });
    }
});

// Marca como inactivo un mueble
furniture.delete("/:id", async (req, res) => {
    const { id } = req.params;
});

export default furniture;