import { JSON_MISSING_ID, JSON_NOT_FOUND, JSON_SERVER_ERROR, Report, ReportsManager, UserRole } from "#DocelServer";
import { Router } from "express";
import { isValidObjectId } from "mongoose";
import { authMiddleware, requireRole } from "../middlewares/auth.js";

function reportToJSON(report) {
    return {
        id: report._id,
        income: report.income,
        period: report.period,
        folio: report.folio,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt
    };
}

const reports = Router();

reports.get("/all", authMiddleware, requireRole(UserRole.ADMINISTRATOR),async (req, res) => {
    try {
        const cache = await ReportsManager.getCache();
        const map = cache.map(a => reportToJSON(a));
        res.status(200).json(map);
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

reports.get("/:id", authMiddleware, requireRole(UserRole.ADMINISTRATOR), async (req, res) => {
    const { id } = req.params;

    if(!id) {
        res.status(400).json(JSON_MISSING_ID);
        return;
    }

    if(!isValidObjectId(id)) {
        res.status(404).json(JSON_NOT_FOUND);
        return;
    }

    try {
        const report = await Report.findById(id);

        if(!report) {
            res.status(404).json(JSON_NOT_FOUND);
            return;
        }

        res.status(200).json(reportToJSON(report));
    }
    catch(_) {
        res.status(500).json(JSON_SERVER_ERROR);
    }
});

export default reports;