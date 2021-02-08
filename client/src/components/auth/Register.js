import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("Passwords do not match", "danger");
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='auth-form'>
			<h1 className='medium text-primary'>
				<i className='fas fa-user'></i> Sign up
			</h1>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Name</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='name'
							value={name}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</label>
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
						/>
					</div>
				</label>
				<small className='form-text'>
					This site uses Gravatar so if you want a profile image, use a Gravatar email
				</small>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Password</span>
					</div>
					<div>
						<input
							className='form-input'
							type='password'
							name='password'
							value={password}
							onChange={(e) => onChange(e)}
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
							name='password2'
							value={password2}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</label>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
