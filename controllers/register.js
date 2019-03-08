module.exports = {
	postController: (req, res) => {
		new User({
			_id: new mongoose.Types.ObjectId(),
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		})
			.save()
			.then(user => {
				res.send(
					createToken(
						{ username: user.username, email: user.email },
						process.env.secret,
						"1hr"
					)
				);
			})
			.catch(err => res.status(500).send(err));
	}
};
