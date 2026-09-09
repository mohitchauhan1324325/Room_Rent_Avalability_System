import express from "express";
import { checkDatabaseHealth } from "../db/dbConnect.js";

const router = express.Router();

router.get("/health", async (_req, res) => {
    try {
        const database = await checkDatabaseHealth();

        return res.status(200).json({
            status: "ok",
            database,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return res.status(503).json({
            status: "error",
            database: {
                healthy: false,
            },
            timestamp: new Date().toISOString(),
        });
    }
});

export default router;