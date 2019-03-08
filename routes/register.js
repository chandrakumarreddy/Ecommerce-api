const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { createToken } = require("../helpers");
const { postController } = require("../controllers/register");

router.route("/").post(postController);

module.exports = router;
