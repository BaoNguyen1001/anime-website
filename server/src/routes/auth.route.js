const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

const isAuth = AuthMiddleware.isAuth;

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/profile", isAuth, authController.profile);
module.exports = router;
