import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Validators } from "#DocelServer";
const validator = Validators.auth;

const auth = Router();

// Crea un nuevo usuario
auth.post("/signup", async (req, res) => {
    try{
        const {name, phone, address, password} = req.body;
        
        const empties = validator.empties(req.body, "name", "phone", "address", "email", "password");        

        if(empties.length > 0){
            res.status(400).json({
                empties
            });
            return;
        }

        const errors = validator.validate(req.body);

        if(errors.length > 0){
            res.status(400).json({
                errors
            });
            return;
        }

        const email = req.body.email.trim().toLowerCase();

        const userExists = await User.findOne({
            email: email
        })

        if(userExists) return res.status(400).send(
            "Este correo ya esta registrado."
        );

        const cryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: name,
            email: email,
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

    }catch(error){
        console.log(error);

        res.status(500).send(" Error de servidor.");
    }
    
});

// Crea una sesion para el usuario
auth.post("/login", async (req, res) => {
    try{
        const {password} = req.body;

        const empties = validator.empties(req.body, "email", "password");

        if(empties.length > 0) {
            return res.status(400).json({
                empties
            });
        }

        const errors = validator.validate(req.body);

        if(errors.length > 0){
            return res.status(400).json({
                errors
            });
        }

        const email = req.body.email.trim().toLowerCase();

        const user = await User.findOne({
            email: email
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