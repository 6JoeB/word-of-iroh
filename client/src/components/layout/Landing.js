import React from "react";

const Landing = () => {
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Word of Iroh</h1>
					<p className='lead'>Create a profile, share posts and interact with others</p>
					<div className='buttons'>
						<a href='#' className='btn btn-primary'>
							Sign Up
						</a>
						<a href='#' className='btn btn-light'>
							Login
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
