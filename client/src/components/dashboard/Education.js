import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
	const educationList = education.map((edu) => (
		<div>
			<h3 className='text-dark'>
				{edu.degree} at {edu.school}
			</h3>
			<p>
				<strong> </strong> <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{" "}
				{!edu.to ? "Now" : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
			</p>
			<p>
				<strong>Field of Study: </strong>
				{edu.fieldofstudy}
			</p>
			<p>
				<strong>Description: </strong>
				{edu.description}
			</p>
			<button className='my-1 btn btn-danger' onClick={() => deleteEducation(edu._id)}>
				Delete
			</button>
		</div>
	));

	return (
		<Fragment>
			<h2 className='my-1'>Education: </h2>
			{educationList}
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.object.isRequired,
};

export default connect(null, { deleteEducation })(Education);
