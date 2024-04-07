const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
