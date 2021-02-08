const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const PasswordResetToken = require("../../models/PasswordResetToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth
// @desc    find & return a user by id
// @access  Public
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server error");
	}
});

// @route   POST api/auth
// @desc    authentic user and get token
// @access  Public
router.post(
	"/",
	[
		check("email", "Please enter valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { password } = req.body;
		const email = req.body.email.toLowerCase();

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
			}

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

// @route   get api/auth/update-password/:user_id
// @desc    Update a users password
// @access  Public
router.put(
	"/update-password/:user_id",
	[check("password", "New password is required").exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { password } = req.body;

		try {
			let user = await User.findById(req.params.user_id);

			if (!user) {
				return res.status(400).json({ msg: "User not found", user: req.params.user_id });
			}

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			return res.status(200).json({ msg: "User password updated" });
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// @route   get api/auth/password-reset-token/:user_id
// @desc    Get a users password reset token
// @access  Public

router.get("/password-reset-token/:user_id", async (req, res) => {
	try {
		const userId = req.params.user_id;
		const passwordResetTokens = await PasswordResetToken.find({ userId }).sort({
			validTill: -1,
		});
		return res.status(200).json(passwordResetTokens[0]);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server error");
	}
});

module.exports = router;
