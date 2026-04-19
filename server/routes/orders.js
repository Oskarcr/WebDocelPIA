import { Router } from "express";

const orders = Router();

// Enlista los pedidos de un cliente en especifico
orders.get("/:id", async (req, res) => {
    const { id } = req.params;
});

// Crea un pedido mediante la estructura indicada
orders.post("/", (req, res) => {

});

// Cambia el estado del pedido asignando su fecha y costo real
orders.patch("/:id/status", (req, res) => {
    const { id } = req.params;
});

// Cambia el estado de la orden a cancelado de ser posible
orders.delete("/:id", (req, res) => {
    const { id } = req.params;
});

export default orders;