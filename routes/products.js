const router = require("express").Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const {
	getProducts,
	postProduct,
	getProduct,
	deleteProduct,
	patchProduct
} = require("../controllers/products");

router
	.route("/")
	.get(getProducts)
	.post(postProduct);
router
	.route("/:id")
	.get(getProduct)
	.delete(deleteProduct)
	.patch(patchProduct)
	.put((req, res) => {
		res.send("put");
	})
	.post((req, res) => {
		res.status(400).json({
			error: "no such route"
		});
	});

module.exports = router;
