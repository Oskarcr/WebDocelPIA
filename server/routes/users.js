import { JSON_SERVER_ERROR, User, UserRole, Validators } from "#DocelServer";
import { Router } from "express";
import bcrypt from "bcrypt";
import { authMiddleware, requireRole } from "../middlewares/auth.js";
const validator = Validators.user;

const users = Router();

function employeesToJSON(user) {
    return {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role
    }
}

// Enlista todos los usuarios con rol mayor a cliente.
users.get("/employees", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    try{
        const user = await User.find({ role: {$gt: UserRole.CLIENT} }).sort({username: 1}).select("-password");

        return res.status(200).json(user.map(a => employeesToJSON(a)));
    }catch(error){
        console.log(error);
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene los datos del usuario logueado actual
users.get("/me", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

users.patch("/me", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
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

// Obtiene los datos de un usuario mediante el email.
users.get("/:email", authMiddleware, requireRole(UserRole.ADMINISTRATOR), async (req, res) => {
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

// Modifica el rol del usuario mediante la pagina de empleados.
users.patch("/:email", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    const email = req.params.email;
    const role = req.body.role;

    if(!role) return res.status(400).json({message: "Rol no definido."});

    try{
        const user = await User.findOneAndUpdate(
            { email: email },
            { role: role },
            { returnDocument: "after" }
        ).select("-password");
    
        

        if(!user) return res.status(400).json({message: "Usuario no encontrado."});
    
        return res.status(200).json(user)

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