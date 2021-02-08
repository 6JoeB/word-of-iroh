const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PasswordResetTokenSchema = new Schema({
	token: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	validTill: {
		type: Date,
		default: () => new Date(+new Date() + 20 * 60 * 1000),
	},
});

module.exports = PasswordResetToken = mongoose.model(
	"passwordResetToken",
	PasswordResetTokenSchema
);
