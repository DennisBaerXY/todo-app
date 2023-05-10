import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";

const SignUp = () => {
	const isAuthenticated = useIsAuthenticated();
	const [error, setError] = useState("");
	const signIn = useSignIn();

	const [loading, setLoading] = useState(false);

	if (isAuthenticated()) {
		return <Navigate to="/" />;
	}
	function validateEmail(email: string) {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	function validatePassword(password: string) {
		//Length 8, 1 uppercase, 1 lowercase, 1 number and 1 special character
		const re =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		return re.test(password);
	}
	function validateFormData(data: any) {
		if (!data.email || data.email.length < 3 || !validateEmail(data.email)) {
			setError("Email is required");
			return false;
		}
		if (!data.username || data.username.length < 3) {
			setError("Username is required");
			return false;
		}

		if (!data.password) {
			setError("Password is required");
			return false;
		}
		return true;
	}
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setError("");

		const form = e.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		if (!validateFormData(data)) {
			setLoading(false);
			return;
		}
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const resData = await response.json();

		if (response.ok) {
			signIn({
				token: resData.token,
				tokenType: "Bearer",
				expiresIn: resData.expiresIn / 60,
				authState: resData.authState,
			});
			console.log(resData);
		}

		if (!response.ok) {
			console.log(resData.msg);

			setError(resData.msg);
		}
		setLoading(false);
	}

	return (
		<div className="h-screen grid place-items-center ">
			<div className="card bg-base-100 shadow-xl  w-full   max-w-screen-sm ">
				<div className="card-body w-full  max-w-screen-lg">
					<h1 className="card-title text-3xl">Register</h1>
					<form className="flex flex-col my-5 " onSubmit={handleSubmit}>
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
						<label htmlFor="email" className="label font-bold ">
							<span className="lable-text">E-Mail</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							autoComplete="email"
							placeholder="John.dough@mail.com"
							className="input input-bordered w-full   "
						/>

						<label htmlFor="username" className=" label font-bold ">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							name="username"
							id="username"
							autoComplete="username"
							placeholder="JohnDoughMan123"
							className="input input-bordered "
						/>

						<label htmlFor="password" className="label font-bold">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							name="password"
							id="password"
							autoComplete="new-password"
							placeholder="********"
							className="input input-bordered w-full mb-3  "
						/>

						<button
							type="submit"
							className={` btn btn-success btn-block ${
								loading ? "loading" : ""
							} `}
						>
							Sign Up
						</button>

						<p className="text-center mt-5">
							Already have an Account?{" "}
							<Link to="/login" className="link link-accent">
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
