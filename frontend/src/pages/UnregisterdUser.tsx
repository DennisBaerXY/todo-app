import React from "react";

const UnregisterdUser = () => {
	return (
		<div>
			<h3>Welcome to Bear-Todo🐻</h3>
			<p>Sign up or login to get started</p>

			<div className="auth-buttons">
				<button className="auth-button">Login</button>
				<button className="auth-button">Sign Up</button>
			</div>
		</div>
	);
};

export default UnregisterdUser;
