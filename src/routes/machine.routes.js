const express = require("express");
const machineController = require("../controllers/machine.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const route = express.Router();

route.post("/machines", authMiddleware, machineController.createMachine);
route.get("/machines", authMiddleware, machineController.getAllMachines);
route.get("/machines/:id", authMiddleware, machineController.getMachineById);
route.put("/machines/:id", authMiddleware, machineController.updateMachine);
route.delete("/machines/:id", authMiddleware, machineController.deleteMachine);

module.exports = route;