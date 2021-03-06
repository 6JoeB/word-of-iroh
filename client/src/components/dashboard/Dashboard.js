import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
	getCurrentProfile,
	auth: { user },
	profile: { profile, loading },
	deleteAccount,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary '>
				<i class='fas fa-chalkboard-teacher myb-1'></i> Your Dashboard
			</h1>
			<div className='profile-img'>
				<img className='round-img' src={user.avatar} alt='User profile'></img>
			</div>
			<p className='lead'>Welcome {user && user.name}</p>

			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<div className='line'></div>
					<Experience experience={profile.experience} />
					<div className='line'></div>
					<Education education={profile.education} />
					<div className='line'></div>
					<Link to={`/profile/${user._id}`} className='my-1 btn btn-light'>
						<i className='fas fa-mouse text-primary'></i> See How Your Profile Looks to
						Others
					</Link>
					<button className='btn btn-danger' onClick={() => deleteAccount()}>
						<i className='fas fa-user-minus'></i> Delete Account
					</button>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, please add some info about yourself</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
