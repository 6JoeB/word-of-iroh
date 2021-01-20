import React, { useState } from "react";

const ForgottenPassword = () => {
	const [email, setEmail] = useState("");
	const [emailSent, toggleEmailSent] = useState(false);

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = () => toggleEmailSent(true);

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
				<input type='submit' className='btn btn-primary' value='Submit' />
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

export default ForgottenPassword;
