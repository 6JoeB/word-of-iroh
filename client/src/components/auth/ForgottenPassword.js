import { connect } from "react-redux";
import React, { useState } from "react";
import { forgotPassword } from "../../actions/auth";
import PropTypes from "prop-types";

const ForgottenPassword = ({ forgotPassword }) => {
	const [email, setEmail] = useState("");
	const [emailSent, toggleEmailSent] = useState(false);

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = () => {
		console.log(email);
		forgotPassword(email);
		toggleEmailSent(true);
	};

	const emailForm = (
		<div className='auth-form'>
			<h3 className='text-primary'>
				Forgotten your password? Enter your email to get a password reset link
			</h3>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Email</span>
					</div>
					<div>
						<input
							className='form-input'
							type='email'
							name='email'
							value={email}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</label>
				<input type='submit' className='btn btn-primary' value='Send' />
			</form>
		</div>
	);

	const passwordResetSent = (
		<div className='auth-form'>
			<p className='text-primary'>Password reset link sent to {email}</p>
		</div>
	);

	return !emailSent ? emailForm : passwordResetSent;
};

ForgottenPassword.propTypes = {
	forgotPassword: PropTypes.func.isRequired,
};

export default connect(null, { forgotPassword })(ForgottenPassword);
