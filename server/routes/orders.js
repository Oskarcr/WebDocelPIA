import { Router } from "express";
import { canChangeOrderStatus, Furniture, JSON_NOT_FOUND, JSON_OK, JSON_SERVER_ERROR, Order, OrderStatus, Sale, UserRole, Validators } from "#DocelServer";
import { authMiddleware, requireRole } from "../middlewares/auth.js";
import requireId from "../middlewares/requireId.js";
import { furnitureToJSON } from "./furnitures.js";
import sameUser from "../middlewares/sameUser.js";

function orderToJSON(order) {
    const format = (date) => {
        if(!date) return "???";
        return new Date(date).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    }

    return {
        id: order._id,
        status: order.status,
        statusName: OrderStatus.toLabel(order.status),
        furnitures: order.furnitures,
        comment: order.comment,
        sent: order.sent,
        deliveredAt: format(order.deliveredAt),
        createdAt: format(order.createdAt),
        updatedAt: format(order.updatedAt)
    };
}

const orders = Router();

const validator = Validators.order;

// Obtiene la lista de los pedidos del usuario actual.
orders.get("/me", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    try{
        const orders = await Order.find({
            user: req.user.id
        });
        res.status(200).json(orders.map(a => orderToJSON(a)));
        return;
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
        return;
    }
});

// Obtiene todos los pedidos pendientes de revision o de fabricacion.
orders.get("/pending", authMiddleware, requireRole(UserRole.EMPLOYEE), async (req, res) => {
    try{
        const orders = await Order.find({
            sent: true,
            status: {
                $in: [OrderStatus.PENDING, OrderStatus.ACCEPTED]
            }
        }).populate("furnitures").populate("user", "-password");
        res.status(200).json(orders.map(a => orderToJSON(a)));
        return;
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
        return;
    }
});

// Obtiene las ordenes de un usuario en específico mediante el id.
orders.get("user/:id", authMiddleware, requireId, async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await Order.find({
            user: id
        }).sort({ 
            deliveredAt: -1 
        });

        res.status(200).json(orders.map(a => orderToJSON(a)));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Crea un pedido mediante la estructura indicada
orders.post("/active", authMiddleware, requireRole(UserRole.CLIENT), async (req, res) => {
    const userId = req.user.id;

    try {
        let order = await Order.findOne({
            user: userId,
            sent: false
        });
        if(!order) {
            order = await Order.create({
                user: userId,
                furnitures: [],
                sent: false,
                status: OrderStatus.PENDING
            });
        }

        res.status(200).json(orderToJSON(order));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Agrega un mueble al pedido activo.
orders.patch("/active/add/:id", authMiddleware, requireId, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const order = await Order.findOne({
            user: userId,
            sent: false
        });

        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        if(order.furnitures.length >= 4) {
            res.status(400).json({
                errors: ["No se puede agregar mas de 4 muebles al pedido."]
            });
            return;
        }

        const furniture = await Furniture.findById(id, {
            active: true
        });

        if(!furniture) {
            res.status(404).json({
                errors: ["No se encontro el mueble con el id especificado"]
            });
            return;
        }

        order.furnitures.push(furniture._id);
        await order.save();
        res.status(200).json(orderToJSON(order));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Remueve un mueble de la lista activa de muebles.
orders.patch("/active/remove/:id", authMiddleware, requireId, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const order = await Order.findOne({
            user: userId,
            sent: false
        });

        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        if(order.furnitures.length <= 0) {
            res.status(400).json({
                errors: ["No cuenta con este elemento en la lista."]
            });
            return;
        }

        const furniture = await Furniture.findById(id, {
            active: true
        });

        if(!furniture) {
            res.status(404).json({
                errors: ["No se encontro el mueble con el id especificado"]
            });
            return;
        }

        const index = order.furnitures.findIndex(x => x.equals(furniture._id));

        if(index < 0) {
            res.status(400).json({
                errors: ["No cuenta con este elemento en la lista."]
            });
            return;
        }

        order.furnitures.splice(index, 1);

        await order.save();
        res.status(200).json(orderToJSON(order));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});


// Envia el pedido para revision
orders.patch("/:id/send", authMiddleware, requireRole(UserRole.CLIENT), requireId, async(req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        if(order.furnitures.length <= 0) {
            res.status(400).json({
                errors: ["No es posible enviar a revision porque no hay muebles en el pedido."]
            });
            return;
        }

        const sent = order.get("sent");
        if(sent) {
            res.status(400).json({
                errors: ["No es posible enviar una orden que ya se envió."]
            });
            return;
        }
        order.set("sent", true);
        await order.save();
        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Cambia el estado del pedido asignando su fecha y costo real
orders.patch("/:id/status", authMiddleware, requireRole(UserRole.CLIENT), requireId, async (req, res) => {
    const { id } = req.params;
    
    const body = validator.parseBody({
        statusName: req.body.statusName
    });

    const errors = validator.validate(body);

    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(body, "statusName");

    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const { statusName } = body;
    const status = OrderStatus.fromLabel(statusName);

    try {
        const order = await Order.findById(id).populate({
            path: "furnitures",
            select: "_id price color",
            populate: {
                path: "color",
                select: "basePrice"
            }
        });
        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        const currentStatus = order.get("status");

        if(!canChangeOrderStatus(currentStatus, status)) {
            const currentStatusName = OrderStatus.toLabel(currentStatus);
            res.status(409).json({
                errors: ["No se puede realizar la accion en el estado actual del pedido ('" + currentStatusName + "')."]
            });
            return;
        }

        if(status === OrderStatus.CONCLUDED) order.set("deliveredAt", Date.now());
        order.set("status", status);
        await order.save();

        if(status === OrderStatus.ACCEPTED) {
            let total = 0;
            const furnitures = order.get("furnitures");
            for(const furniture of furnitures){
                total += furniture.price;
                total += furniture.color.basePrice;
            }

            await Sale.create({
                order: order._id,
                total
            });
        }

        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Devuelve una respuesta a la solicitud del pedido del cliente.
orders.patch("/:id/review", authMiddleware, requireRole(UserRole.EMPLOYEE), requireId, async (req, res) => {
    const body = validator.parseBody(req.body);

    const errors = validator.validate(body);
    if(errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const empties = validator.empties(body, "comment");
    if(empties.length > 0) {
        res.status(400).json({ errors: empties });
        return;
    }

    const { id } = req.params;
    const status = OrderStatus.fromLabel(body.statusName);
    const { comment } = body;

    try {
        const order = await Order.findById(id);
        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        const currentStatus = order.get("status");
        if(currentStatus !== OrderStatus.PENDING) {
            res.status(409).json({
                errors: ["No se puede cambiar el estado de un pedido que no esta pendiente."]
            });
            return;
        }

        if(!canChangeOrderStatus(currentStatus, status)) {
            const currentStatusName = OrderStatus.toLabel(currentStatus);
            res.status(409).json({
                errors: ["El estado no puede pasar de ser '" + currentStatusName + "' a '" + body.statusName + "'."]
            });
            return;
        }

        order.set("status", status)
        if(comment) order.set("comment", comment);
        await order.save();
        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene los muebles correspondientes a un pedido.
orders.get("/:id/furnitures", authMiddleware, requireRole(UserRole.CLIENT), requireId, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate("furnitures");

        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        const furnitures = order.furnitures.map(a => furnitureToJSON(a));
        res.status(200).json(furnitures);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});


// Obtiene un pedido mediante la id.
orders.get("/:id", authMiddleware, requireRole(UserRole.CLIENT), requireId, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        res.status(200).json(orderToJSON(order));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Cambia el estado de la orden de la orden a cancelado en caso de ser posible.
orders.delete("/:id", authMiddleware, requireRole(UserRole.EMPLOYEE), requireId, async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if(!order) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }
        const currentStatus = order.get("status");
        if(!canChangeOrderStatus(currentStatus, OrderStatus.CANCELED)) {
            res.status(409).json({
                errors: ["No se puede cancelar el pedido cuando esta en el estado actual."]
            });
            return;
        }

        order.set("status", OrderStatus.CANCELED);
        await order.save();
        res.status(200).json(JSON_OK);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default orders;