import { Router } from "express";

const sales = Router();

// Obtiene una venta especifica
sales.get("/:id", (req, res) => {
    const { id } = req.params;
});

// Enlista todas las ventas de la empresa
sales.get("/all", (req, res) => {

});

export default sales;