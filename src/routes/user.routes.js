const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const route = express.Router();

route.post("/register", authMiddleware,userController.register);
route.post("/login", userController.login);
route.get("/me", authMiddleware, userController.getMe);
route.put("/me", authMiddleware, userController.updateMe);

module.exports = route
