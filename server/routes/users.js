import { Router } from "express";

const users = Router();

// Enlista todos los usuarios con rol mayor a cliente.
users.get("/employees", async (req, res) => {

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