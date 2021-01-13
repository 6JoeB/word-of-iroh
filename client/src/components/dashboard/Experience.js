import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<div>
			<h3 className='text-dark'>
				{exp.title} at {exp.company}
			</h3>
			<p>
				<strong> </strong> <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -{" "}
				{!exp.to ? "Now" : <Moment format='DD/MM/YYYY'>{exp.to}</Moment>}
			</p>
			<p>
				<strong>Location: </strong> {exp.location}
			</p>
			<p>
				<strong>Description: </strong> {exp.description}
			</p>
			<button className='my-1 btn btn-danger' onClick={() => deleteExperience(exp._id)}>
				Delete
			</button>
		</div>
	));

	return (
		<Fragment>
			<h2 className='my-1'>Experience:</h2>
			{experiences}
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
