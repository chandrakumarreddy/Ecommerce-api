const mongoose = require("mongoose");

//db connection
mongoose
	.connect(process.env.mongo_url)
	.then(() => console.log("connected"))
	.catch(() => console.log("not connected"));

//schemas

require("./User");
require("./Product");
require("./Order");
