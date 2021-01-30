import React, { useState } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";

const ResetPassword = ({ setAlert }) => {
	const [formData, setFormData] = useState({
		newPassword: "",
		confirmPassword: "",
	});

	const { newPassword, confirmPassword } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (newPassword != confirmPassword) {
			setAlert("Passwords do not match", "danger");
			console.log("passwords do not match");
		}
		console.log(newPassword + confirmPassword);
	};

	return (
		<div className='auth-form'>
			<h1 className='medium text-primary'>Please enter a new password</h1>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>New Password</span>
					</div>
					<div>
						<input
							className='form-input'
							type='password'
							name='newPassword'
							minLength='6'
							value={newPassword}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</label>

				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Confirm Password</span>
					</div>
					<div>
						<input
							className='form-input'
							type='password'
							name='confirmPassword'
							minLength='6'
							value={confirmPassword}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</label>
				<input type='submit' className='btn btn-primary' value='Submit'></input>
			</form>
		</div>
	);
};

ResetPassword.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ResetPassword);
