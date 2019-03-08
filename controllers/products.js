module.exports = {
	getProducts: (req, res) => {
		Product.find()
			.exec()
			.then(products => {
				res.status(200).json({
					products: products.map(product =>
						Object.assign({}, product._doc, {
							query: {
								type: "individual product",
								url: `http://localhost:3000/api/products/${
									product._id
								}`
							}
						})
					)
				});
			})
			.catch(err => res.send(err));
	},
	postProduct: (req, res) => {
		new Product({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			category: req.body.category,
			price: req.body.price,
			description: req.body.description
		})
			.save()
			.then(() => {
				res.status(201).json({
					message: "Added successfully",
					query: {
						type: "All products",
						url: `http://localhost:3000/api/products`
					}
				});
			})
			.catch(err => res.send(err));
	},
	getProduct: (req, res) => {
		Product.find({ _id: req.params.id })
			.exec()
			.then(product => {
				res.status(200).json({
					product: Object.assign({}, product, {
						query: {
							type: "All products",
							url: `http://localhost:3000/api/products`
						}
					})
				});
			});
	},
	deleteProduct: (req, res) => {
		Product.remove({ _id: req.params.id })
			.then(() =>
				res.status(202).json({
					message: "deleted successfully",
					query: {
						type: "All products",
						url: `http://localhost:3000/api/products`
					}
				})
			)
			.catch(err => res.status(500).send(err));
	},
	patchProduct: (req, res) => {
		Product.findOne({ _id: req.params.id })
			.exec()
			.then(product => {
				product.name = req.body.name;
				product.category = req.body.category;
				product.price = req.body.price;
				product.description = req.body.description;
				product
					.save()
					.then(product => {
						res.status(202).json({
							message: "updated successfully",
							query: {
								type: "All products",
								url: `http://localhost:3000/api/products`
							}
						});
					})
					.catch(err => res.send(err));
			})
			.catch(err => res.send(err));
	}
};
