module.exports = {
	postController: (req, res) => {
		User.findOne({ email: req.body.email })
			.exec()
			.then(user => {
				if (user) {
					if (user.password === req.body.password) {
						res.json({
							token: createToken(
								{ username: user.username, email: user.email },
								process.env.secret,
								"1hr"
							)
						});
					}
				}
			})
			.catch(err => res.status(500).send(err));
	}
};
