import { Router } from "express";

const auth = Router();

// Crea un nuevo usuario
auth.post("/signup", async (req, res) => {
    try{
        const {name, phone, address, email, password} = req.body;
        

    }catch(error){
        console.log(error);
    }
    
});

// Crea una sesion para el usuario
auth.post("/login", async (req, res) => {

});

export default auth;