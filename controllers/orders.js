module.exports = {
	getOrders: (req, res) => {
		Order.find()
			.populate("details")
			.exec()
			.then(orders => {
				res.status(200).json({
					orders: orders.map(order =>
						Object.assign({}, order._doc, {
							query: {
								type: "individual order",
								url: `http://localhost:3000/api/orders/${
									order._id
								}`
							}
						})
					)
				});
			})
			.catch(err => res.send(err));
	},
	postOrder: (req, res) => {
		new Order({
			_id: new mongoose.Types.ObjectId(),
			details: req.body.productId
		})
			.save()
			.then(() => {
				res.status(201).json({
					message: "Added successfully",
					query: {
						type: "All orders",
						url: `http://localhost:3000/api/orders`
					}
				});
			})
			.catch(err => res.send(err));
	},
	getOrder: (req, res) => {
		Order.find({ _id: req.params.id })
			.populate("details")
			.exec()
			.then(order => {
				res.status(200).json({
					order: Object.assign({}, order, {
						query: {
							type: "All orders",
							url: `http://localhost:3000/api/orders`
						}
					})
				});
			});
	},
	deleteOrder: (req, res) => {
		Order.remove({ _id: req.params.id })
			.then(() =>
				res.status(202).json({
					message: "deleted successfully",
					query: {
						type: "All products",
						url: `http://localhost:3000/api/orders`
					}
				})
			)
			.catch(err => res.status(500).send(err));
	}
};
