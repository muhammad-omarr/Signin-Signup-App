const express = require("express");
const router = express.Router();
const { login, signup, home } = require("../controllers/main");
const verifyToken = require("../middleware/verifyToken");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.get("/home", verifyToken, home);

module.exports = router;
