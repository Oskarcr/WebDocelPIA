import { Router } from "express";
import { JSON_SERVER_ERROR, Order, OrderStatus, User, UserRole } from "#DocelServer";
import { authMiddleware, requireRole } from "../middlewares/auth.js";

function orderToJSON(order) {
    return {
        status: order.status,
        statusName: OrderStatus.toLabel(order.status),
        furnitures: order.furnitures,
        comment: order.comment,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
    };
}

const orders = Router();

// Obtiene los pedidos del usuario actual.
orders.get("/me", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    try{
        const orders = await Order.find({
            user: req.user.id
        }).populate("furnitures").populate("user", "-password");

        return res.status(200).json(orders.map(a => orderToJSON(a)));
    }catch(error){
        console.log(error);
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene todos los pedidos de todos los usuarios.
orders.get("/all", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    try{
        const orders = await Order.find().populate("furnitures").populate("user", "-password")
        return res.status(200).json(orders.map(a => orderToJSON(a)));
    }catch(_){
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene las ordenes de un usuario en específico mediante el email.
orders.get("/:email", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    const { email } = req.params;

    if(!email) return res.status(400).json({message: "No se encontró el email."});

    try{

        const user = await User.findOne({
            email: email
        })

        if(!user) return res.status(400).json({message: "Usuario no encontrado."});

        const orders = await Order.find({
            user: user._id
        }).sort({deliveredAt: -1})
        return res.status(200).json(orders.map(a => orderToJSON(a)));
    }catch(_){
        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Enlista los pedidos de un cliente en especifico
orders.get("/by/:userId", async (req, res) => {
    const { userId } = req.params;
});

// Crea un pedido mediante la estructura indicada
orders.post("/", async (req, res) => {
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