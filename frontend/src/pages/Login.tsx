import React, { useEffect, useState } from "react";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
	const isAuthenticated = useIsAuthenticated();
	const signIn = useSignIn();
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	if (isAuthenticated()) {
		return <Navigate to="/" />;
	}

	async function login(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const form = e.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		console.log(data);
		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const resData = await response.json();

			if (response.ok) {
				console.log(resData);
				if (
					signIn({
						token: resData.token,
						tokenType: "Bearer",
						expiresIn: resData.expiresIn / 60,
						authState: resData.authState,
					})
				) {
					console.log("login successful... redirecting to '/'");
				}
			}

			if (!response.ok) {
				setError(resData.msg);
			}
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	}

	return (
		<div className="h-screen grid place-items-center ">
			<div className="card  bg-base-100 shadow-xl  w-full   max-w-screen-sm ">
				<div className="card-body">
					<h1 className="card-title text-3xl">Login</h1>
					<form className="flex flex-col my-5" onSubmit={login}>
						{error && (
							<p className="alert alert-error shadow-lg">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>{error}.</span>
								</div>
							</p>
						)}
						<label htmlFor="username" className="label font-bold ">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="John"
							autoComplete="username"
							className="input input-bordered w-full  "
						/>

						<label htmlFor="password" className="label font-bold ">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							id="password"
							autoComplete="current-password"
							placeholder="********"
							className="input input-bordered w-full  mb-3 "
						/>

						<button
							type="submit"
							className={` btn btn-success btn-block ${
								loading ? "loading" : ""
							} `}
						>
							Login
						</button>

						<p className="text-center mt-5  ">
							Don't have an account?{" "}
							<Link to="/signup" className="link link-accent">
								Register
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
