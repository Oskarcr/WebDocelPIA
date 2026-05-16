import { User, Validators } from "#DocelServer";
import { Router } from "express";
import bcrypt from "bcrypt";
import authMiddleware from "../middlewares/auth.js";
const Validator = Validators.user;

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
        res.status(500).json({
            message: "Error del servidor."
        });
    }
});

users.patch("/me", authMiddleware, async (req, res) => {
    try {
        const empties = Validator.empties(req.body, "username", "email", "address", "phone");

        if(empties.length > 0){
            return res.status(400).json({
                empties
            });
        }

        const errors = Validator.validate(req.body);

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
        return res.status(500).json({
            message: "Error del servidor."
        })
    }
});

// Obtiene los datos de un usuario mediante el id.
users.get("/:id", async (req, res) => {
    const { id } = req.params;
});

// Modifica datos de un usuario mediante el id.
users.patch("/:id", async (req, res) => {
    const { id } = req.params;
});

export default users;