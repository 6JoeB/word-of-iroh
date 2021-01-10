import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		company: "",
		title: "",
		location: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { company, title, location, from, to, current, description } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	return (
		<Fragment>
			<h1 className='large text-primary'>
				<i className='fas fa-code-branch'></i> Add An Experience
			</h1>
			<p className='lead'>Add any experience or positions you have had</p>
			<small>* = required field</small>
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault();
					addExperience(formData, history);
				}}
			>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Title/Role *</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='title'
							value={title}
							onChange={(e) => onChange(e)}
							required
						></input>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Company *</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='company'
							value={company}
							onChange={(e) => onChange(e)}
							required
						></input>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Location</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='location'
							value={location}
							onChange={(e) => onChange(e)}
							required
						></input>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>From Date</span>
					</div>
					<div>
						<input
							className='form-input'
							type='date'
							name='from'
							value={from}
							onChange={(e) => onChange(e)}
						></input>
					</div>
				</label>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={(e) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{" "}
						Current
					</p>
				</div>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>To Date</span>
					</div>
					<div>
						<input
							className='form-input'
							type='date'
							name='to'
							value={to}
							onChange={(e) => onChange(e)}
							disabled={toDateDisabled ? "disabled" : ""}
						></input>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Description</span>
					</div>
					<div>
						<textarea
							className='form-input'
							name='description'
							cols='30'
							rows='5'
							placeholder='Job Description'
							value={description}
							onChange={(e) => onChange(e)}
						></textarea>
					</div>
				</label>
				<input type='submit' className='btn btn-primary my-1' value='Submit' />
				<Link to='/dashboard' className='btn btn-light my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
