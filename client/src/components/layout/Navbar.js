import React from "react";

export const Navbar = () => {
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<a href='#'>
					<i className='fas fa-users'></i> Word of Iroh
				</a>
			</h1>
			<ul>
				<li>
					<a href='#'>Users</a>
				</li>
				<li>
					<a href='#'>Register</a>
				</li>
				<li>
					<a href='#'>Login</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
