import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, UserRole, Validators } from "#DocelServer";
const validator = Validators.user;

const auth = Router();

// Crea un nuevo usuario
auth.post("/signup", async (req, res) => {
    try {
        const { username, phone, address, password } = req.body;

        const empties = validator.empties(req.body, "username", "phone", "address", "email", "password");

        if (empties.length > 0) {
            res.status(400).json({
                empties
            });
            return;
        }

        const errors = validator.validate(req.body);

        if (errors.length > 0) {
            res.status(400).json({
                errors
            });
            return;
        }

        const email = req.body.email.trim().toLowerCase();

        const userExists = await User.findOne({
            email: email
        })

        if (userExists) return res.status(400).json({
            message: "Este correo ya esta registrado."
        });

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            email: email,
            password: cryptedPassword,
            address: address,
            phone: phone,
            role: UserRole.CLIENT
        });

        res.status(201).json({
            user: {
                username: user.username,
                email: user.email,
            },
            message: "Usuario creado con éxito."
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error de servidor."
        });
    }

});

// Crea una sesion para el usuario
auth.post("/login", async (req, res) => {
    try {
        const { password } = req.body;

        const empties = validator.empties(req.body, "email", "password");

        if (empties.length > 0) {
            return res.status(400).json({
                empties
            });
        }

        const errors = validator.validate(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                errors
            });
        }

        const email = req.body.email.trim().toLowerCase();

        const user = await User.findOne({
            email: email
        });

        if (!user) return res.status(400).json({
            message: "Este usuario no existe."
        });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json({
            message: "Credenciales incorrectas."
        });

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.status(200).json({
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error del servidor."
        });
    }
});

export default auth;