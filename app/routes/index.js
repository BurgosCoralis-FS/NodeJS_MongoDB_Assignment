const express = require("express");
const router = express.Router();
const playerRoutes = require("./playerRoutes");

router.get("/", (req, res) => {
    res.status(200).json({success: true, message: `${req.method} - Request made`});
});

router.use("/players", playerRoutes);

module.exports = router;