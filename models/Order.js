const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
	_id: Schema.Types.ObjectId,
	details: { type: Schema.Types.ObjectId, ref: "Product" }
});

module.exports = mongoose.model("Order", ordersSchema);
