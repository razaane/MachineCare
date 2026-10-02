const express = require("express");
const reportController = require("../controllers/report.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const route = express.Router();

route.post("/reports", authMiddleware, reportController.createReport);
route.get("/reports", authMiddleware, reportController.getAllReports);
route.get("/reports/:id", authMiddleware, reportController.getReportById);
route.put("/reports/:id", authMiddleware, reportController.updateReport);
route.patch("/reports/:id/resolve", authMiddleware, reportController.resolveReport);

route.get("/machines/:id/reports", authMiddleware, reportController.getReportsByMachine);

module.exports = route;