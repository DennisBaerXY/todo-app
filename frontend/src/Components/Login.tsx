import React from "react";
import "./Login.sass";

const Login = () => {
	return (
		<div className="h-screen grid place-items-center ">
			<div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg flex-col">
				<h1 className="text-3xl font-bold underline">Login</h1>
				<form className="flex flex-col ">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						className="bg-gray-50 border-gray-200 border text-gray-900 text-sm rounded-lg p-2 "
					/>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" />
					<button type="submit">Login</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
