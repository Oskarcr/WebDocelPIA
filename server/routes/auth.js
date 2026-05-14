import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "#DocelServer";

const auth = Router();

// Crea un nuevo usuario
auth.post("/signup", async (req, res) => {
    try{
        const {name, phone, address, email, password} = req.body;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const normalizedEmail = email.trim().toLowerCase();
        const validEmail = emailRegex.test(normalizedEmail);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const validPassword = passwordRegex.test(password);

        if(!validEmail) return res.status(400).send(
            "Se debe proporcionar un correo valido."
        );

        if(!validPassword) return res.status(400).send(
            "La contraseña debe ser de al menos 8 caracteres, 1 mayuscula y 1 minuscula."
        );

        const userExists = await User.findOne({
            email: normalizedEmail
        })

        if(userExists) return res.status(400).send(
            "Este correo ya esta registrado."
        );

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: name,
            email: normalizedEmail,
            password: cryptedPassword,
            address: address,
            phone: phone,
            role: 0
        });

        res.status(201).json({
            user: {
                username: user.username,
                email: user.email
            }
        });

        console.log(req.body);
    }catch(error){
        console.log(error);

        res.status(500).send(" Error de servidor.");
    }
    
});

// Crea una sesion para el usuario
auth.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if(!user) return res.status(400).send("Este usuario no existe.");

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword) return res.status(400).send("Credenciales incorrectas.");

        const token = jwt.sign({
                email: email
            }, process.env.JWT_SECRET,{
                expiresIn: "3d"
            });

            console.log(req.body);

            return res.status(200).json({
                username: user.username,
                email: user.email,
                token: token
            });
    }catch(error){
        console.log(error);

        res.status(500).send("Error del servidor.");
    }
});

export default auth;