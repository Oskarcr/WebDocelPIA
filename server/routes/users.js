import { User, Validators } from "#DocelServer";
import { Router } from "express";
import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.js";
import { JSON_SERVER_ERROR } from "../../constants.js";
const validator = Validators.user;

const users = Router();

// Enlista todos los usuarios con rol mayor a cliente.
users.get("/employees", async (req, res) => {

});

// Obtiene los datos del usuario logueado actual
users.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

users.patch("/me", authMiddleware, async (req, res) => {
    try {
        const empties = validator.empties(req.body, "username", "email", "address", "phone");

        if(empties.length > 0){
            return res.status(400).json({
                empties
            });
        }

        const errors = validator.validate(req.body);

        if(errors.length > 0){
            return res.status(400).json({
                errors
            })
        }

        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            req.body,
            {
                returnDocument: "after"
            }
        ).select("-password");

        res.status

        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene los datos de un usuario mediante el username.
users.get("/:email", async (req, res) => {
    try{
        const param = validator.parseBody(req.params);

        const email = param.email

        const user = await User.findOne({
            email: email
        }).select("-password");

        if(!user) return res.status(400).json({
            message: "Este usuario no existe"
        })

        return res.status(200).json(user);

    }catch(error){
        console.log(error);
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Modifica datos de un usuario mediante el id.
users.patch("/:id", async (req, res) => {
    const { id } = req.params;
});

export default users;