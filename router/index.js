const express = require("express")
const router = express.Router();

const userrouter = require("./user.js");
const accountrounter = require("./account.js");

router.use("/user",userrouter);
router.use("/account", accountrounter);
module.exports = router();