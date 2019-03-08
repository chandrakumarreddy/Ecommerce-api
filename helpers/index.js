const jwt = require("jsonwebtoken");

const createToken = (details, secret, expiresIn) => {
	return jwt.sign(details, secret, {
		expiresIn: expiresIn
	});
};

const authenticate = (req, res, next) => {
	const token = req.headers["authorization"].split(" ")[1];
	console.log(token);
	if (token) {
		const user = jwt.verify(token, process.env.secret);
		console.log(user);
		req.user = user;
		return next();
	}
	res.status(403).send("forbidden error");
};

module.exports = {
	createToken,
	authenticate
};
