const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordResetTokenSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	validTill: {
		type: Date,
		default: () => new Date(+new Date() + 20 * 60 * 1000),
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
});

module.exports = PasswordResetToken = mongoose.model(
	"passwordResetToken",
	PasswordResetTokenSchema
);
