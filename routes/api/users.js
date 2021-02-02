const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Crypto = require("crypto");
const config = require("config");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const updatePasswordEmailPassword = config.get("updatePasswordEmailPassword");
const updatePasswordEmail = config.get("updatePasswordEmail");
const User = require("../../models/User");
const PasswordResetToken = require("../../models/PasswordResetToken");

// @route   POST api/users
// @desc    register user
// @access  Public
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "Please enter valid email").isEmail(),
		check("password", "Please enter valid password with 6 or more characters").isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ errors: [{ msg: "User already exists" }] });
			}

			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				name,
				email,
				password,
				avatar,
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route   get api/users/password-reset-email
// @desc    check if a user exists and send them a reset password email
// @access  Public
router.post("/password-reset-email", async (req, res) => {
	try {
		const email = req.body.email.toLowerCase();
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ errors: [{ msg: "Invalid email" }] });
		}

		const userId = user._id;
		// Send password reset email
		var transport = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: updatePasswordEmail,
				pass: updatePasswordEmailPassword,
			},
		});

		var mailOptions = {
			from: '"Team at Word of Iroh" <WordofIroh@gmail.com>',
			to: email,
			subject: "Password reset link",
			text: "Reset your Word of Iroh password",
			html: `<b> Hey there! </b> <br>
			Looks like someone requested to reset your account password! <br>
			If it was not you then you can safely ignore this email. <br>
			<a href="http://localhost:3000/update-password/${userId}" target="_blank">Click here to reset your password.</a> <br><br>
			<i>From the team at Word of Iroh</i>`,
		};

		transport.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("Message sent: %s", info.messageId);
		});

		let token = Crypto.randomBytes(16).toString("hex");

		let passwordResetToken = new PasswordResetToken({ token, userId });

		await passwordResetToken.save();

		return res.status(200).send(`Message sent to ${email}`);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

module.exports = router;
