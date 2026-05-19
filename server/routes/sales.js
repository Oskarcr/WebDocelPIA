import { JSON_MISSING_ID, JSON_NOT_FOUND, JSON_SERVER_ERROR, Report, Sale, UserRole } from "#DocelServer";
import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { authMiddleware, requireRole } from "../middlewares/auth.js";

const sales = Router();

function salesToJSON(sale) {
    return {
        id: sale._id,
        total: sale.total,
        date: sale.createdAt,
        amount: sale.order?.furnitures?.length,
        username: sale.order?.user?.username
    }
}

// Obtiene todas las ventas existentes.
sales.get("/all", authMiddleware, requireRole(UserRole.ADMINISTRATOR), async (req, res) => {
    try{
        const sales = await Sale.find();

        return res.status(200).json(sales);
    }catch(error){
        console.log(error);

        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Lista todas las ventas de un reporte mensual de la empresa.
sales.get("/report/:id", authMiddleware, requireRole(UserRole.ADMINISTRATOR), async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json(JSON_MISSING_ID);

    if (!isValidObjectId(id)) return res.status(400).json(JSON_NOT_FOUND);

    try {
        const report = await Report.findById(id).populate({
            path: "sales",
            populate: {
                path: "order",
                populate: {
                    path: "user",
                    select: "username"
                }
            }
        });

        if (!report) return res.status(400).json(JSON_NOT_FOUND);

        const mappedSales = report.sales.map((sales) => salesToJSON(sales));

        res.status(200).json(mappedSales)
    } catch (error) {
        console.log(error);

        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

// Obtiene una venta especifica mediante la id.
sales.get("/:id", authMiddleware, requireRole(UserRole.ADMINISTRATOR), async (req, res) => {
    const { id } = req.params;

    try{
        const sale = await Sale.findById(id);
        
        return res.status(200).json(sale);
    }catch(error){
        console.log(error);

        return res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default sales;