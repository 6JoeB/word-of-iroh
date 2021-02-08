import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alert";
import { updatePassword } from "../../api/index";

const UpdatePassword = ({ setAlert, match }) => {
	const [formData, setFormData] = useState({
		newPassword: "",
		confirmPassword: "",
	});

	const [redirect, setRedirect] = useState(false);

	const { newPassword, confirmPassword } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (newPassword === confirmPassword) {
			try {
				updatePassword(match.params.user_id, newPassword);
				setAlert("Password changed successfuly", "success");
				setRedirect(true);
			} catch (err) {
				console.log(err);
				setAlert("Password not changed, please try again", "danger");
			}
		} else {
			setAlert("Passwords do not match", "danger");
		}
	};

	if (redirect) {
		return <Redirect to='/login' />;
	}

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

UpdatePassword.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(UpdatePassword);
