import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='auth-form'>
			<h1 className='medium text-primary'>
				<i className='fas fa-user'></i> Sign In
			</h1>
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

				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Password</span>
					</div>
					<div>
						<input
							className='form-input'
							type='password'
							name='password'
							minLength='6'
							value={password}
							onChange={(e) => onChange(e)}
							required
						/>
					</div>
				</label>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
