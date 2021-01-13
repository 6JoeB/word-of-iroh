import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
	});

	const [displaySocialInputs, toggelSocialInputs] = useState(false);

	useEffect(() => {
		getCurrentProfile();

		setFormData({
			company: loading || !profile.company ? "" : profile.company,
			website: loading || !profile.website ? "" : profile.website,
			location: loading || !profile.location ? "" : profile.location,
			status: loading || !profile.status ? "" : profile.status,
			skills: loading || !profile.skills ? "" : profile.skills.join(","),
			githubusername: loading || !profile.githubusername ? "" : profile.githubusername,
			bio: loading || !profile.bio ? "" : profile.bio,
			twitter: loading || !profile.social ? "" : profile.social.twitter,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			linkedin: loading || !profile.social ? "" : profile.social.linkedin,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram,
		});
	}, [loading, getCurrentProfile]);

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, true);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>
				<i class='fas fa-user-edit'></i> Edit Your Profile
			</h1>
			<p className='lead'>Add or remove information your profile</p>
			<div className='line'></div>
			<small>* = required field</small>
			<form onSubmit={(e) => onSubmit(e)} className='form'>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Career status *</span>
					</div>
					<div>
						<input
							className='form-input'
							value={status}
							onChange={(e) => onChange(e)}
							name='status'
						></input>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Company</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='company'
							value={company}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Website</span>
					</div>
					<input
						className='form-input'
						type='text'
						name='website'
						value={website}
						onChange={(e) => onChange(e)}
					/>
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
						/>
					</div>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Skills *</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='skills'
							value={skills}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</label>
				<small className='form-text'>
					Please use comma separated values (eg. Tennis, JavaScript, Writing)
				</small>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>A bio about yourself</span>
					</div>
					<textarea
						className='form-input'
						type='text'
						name='bio'
						value={bio}
						onChange={(e) => onChange(e)}
					></textarea>
				</label>
				<label className='form-group'>
					<div className='form-placeholder'>
						<span>Github username</span>
					</div>
					<div>
						<input
							className='form-input'
							type='text'
							name='githubusername'
							value={githubusername}
							onChange={(e) => onChange(e)}
						/>
					</div>
				</label>
				<small className='form-text'>
					If you want your latest repos and a Github link, include your username
				</small>

				<div className='my-2'>
					<button
						onClick={() => toggelSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>(Optional)</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className='social-input'>
							<i className='m-auto fab fa-twitter fa-2x'></i>
							<label className='form-group'>
								<div className='form-placeholder'>
									<span>Twitter URL</span>
								</div>
								<div>
									<input
										className='form-input'
										type='text'
										name='twitter'
										value={twitter}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</label>
						</div>
						<div className='social-input'>
							<i className='m-auto fab fa-youtube fa-2x'></i>
							<label className='form-group'>
								<div className='form-placeholder'>
									<span>Youtube URL</span>
								</div>
								<div>
									<input
										className='form-input'
										type='text'
										name='youtube'
										value={youtube}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</label>
						</div>
						<div className='social-input'>
							<i className='m-auto fab fa-facebook fa-2x'></i>
							<label className='form-group'>
								<div className='form-placeholder'>
									<span>Facebook URL</span>
								</div>
								<div>
									<input
										className='form-input'
										type='text'
										name='facebook'
										value={facebook}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</label>
						</div>
						<div className='social-input'>
							<i className='m-auto fab fa-instagram fa-2x'></i>
							<label className='form-group'>
								<div className='form-placeholder'>
									<span>Instagram URL</span>
								</div>
								<div>
									<input
										className='form-input'
										type='text'
										name='instagram'
										value={instagram}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</label>
						</div>
						<div className='social-input'>
							<i className='m-auto fab fa-linkedin fa-2x'></i>
							<label className='form-group'>
								<div className='form-placeholder'>
									<span>Linkedin URL</span>
								</div>
								<div>
									<input
										className='form-input'
										type='text'
										name='linkedin'
										value={linkedin}
										onChange={(e) => onChange(e)}
									/>
								</div>
							</label>
						</div>
					</Fragment>
				)}

				<input type='submit' className='btn btn-primary my-1' value='Submit' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
