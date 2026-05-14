import { Router } from "express";

const orders = Router();

// Obtiene los datos de una orden en específico.
orders.get("/:id", (req, res) => {
    const { id } = req.params;
});

// Enlista los pedidos de un cliente en especifico
orders.get("/by/:userId", async (req, res) => {
    const { userId } = req.params;
});

// Crea un pedido mediante la estructura indicada
orders.post("/", (req, res) => {
    
});

// Cambia el estado del pedido asignando su fecha y costo real
orders.patch("/:id/status", (req, res) => {
    const { id } = req.params;
});

// Cambia el estado de la orden de la orden a cancelado en caso de ser posible.
orders.delete("/:id", (req, res) => {
    const { id } = req.params;
});

export default orders;