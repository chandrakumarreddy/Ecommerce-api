require("dotenv").config({ path: "variables.env" });
const express = require("express");
require("./models/db");
const productsRouter = require("./routes/products");
const ordersRouter = require("./routes/orders");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authenticate } = require("./helpers");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/products", productsRouter);
app.use("/api/orders", authenticate, ordersRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);

app.use((req, res, next) => {
	const err = {
		message: "invalid request",
		apis: {
			products: "/api/products",
			orders: "/api/orders",
			login: "/api/login",
			regsiter: "/api/register"
		}
	};
	next(err);
});

app.use((err, req, res, next) => {
	if (err) {
		res.status(400).send(err);
	}
	next();
});

app.listen(PORT, () => {
	console.log(`server is listening at ${PORT}`);
});
