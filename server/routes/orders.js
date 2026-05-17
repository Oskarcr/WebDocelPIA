import { Router } from "express";
import { Order } from "#DocelServer";
import { authMiddleware } from "../middlewares/auth.js";

const orders = Router();

orders.get("/me", authMiddleware, async (req, res) => {
    try{
        const orders = await Order.find({
            user: req.user.id
        }).populate("furnitures").populate("user", "-password");

        return res.status(200).json(orders);
    }catch(error){
        console.log(error);

        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

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