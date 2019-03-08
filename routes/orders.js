const router = require("express").Router();
const mongoose = require("mongoose");
const Order = mongoose.model("Order");
const {
	getOrders,
	postOrder,
	getOrder,
	deleteOrder
} = require("../controllers/orders");

router
	.route("/")
	.get(getOrders)
	.post(postOrder);
router
	.route("/:id")
	.get(getOrder)
	.delete(deleteOrder)
	.post((req, res) => {
		res.status(400).json({
			error: "no such route"
		});
	});

module.exports = router;
