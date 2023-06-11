import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { unmountComponentAtNode } from "react-dom";
import { CreatedToast } from "../features/toast/CreatedToast";
import { useTodoContext } from "@/features/todos/useTodoContext";

interface FormFields {
	title: string;
	description: string;
	dueDate: string;
}

interface Toast {
	message: string;
	id: number;
}
const CreateTodo = () => {
	const [toastId, setToastId] = useState(0);
	const dateRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const apiBasePath = import.meta.env.APIBASE_PATH || "http://backend-service";

	const [toastList, setToastList] = useState<Toast[]>([]);
	const [created, setCreated] = useState(false);
	const authHeader = useAuthHeader();
	const toastBoxRef = useRef<HTMLDivElement>(null);

	const context = useTodoContext();

	useEffect(() => {
		if (dateRef.current) {
			dateRef.current.valueAsDate = new Date();
		}
	}, []);

	const validateForm = (data: any) => {
		if (data.title === "") {
			return false;
		}
		if (data.description === "") {
			return false;
		}
		if (data.dueDate === "") {
			return false;
		}
		return true;
	};

	const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		const form = e.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		if (!validateForm(data)) {
			setError("Please fill out all fields");
			setIsLoading(false);
			return;
		}

		const response = await fetch(apiBasePath + "/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader(),
			},
			body: JSON.stringify(data),
		});
		const resData = await response.json();

		if (response.ok) {
			console.log(resData);
			await context.fetchAll();

			setCreated(true);
		}

		if (!response.ok) {
			setError(resData.error._message);
			console.error(resData);
		}
		setIsLoading(false);
	};
	if (created) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="h-screen grid place-items-center ">
			<div className="card  bg-base-100 shadow-xl  w-full   max-w-screen-sm ">
				<div className="card-body">
					<h1 className="card-title text-3xl text-accent">
						<Link to="/">
							<button className="btn btn-square btn-ghost">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									stroke="currentColor"
									viewBox="0 96 960 960"
								>
									<path d="M480 896 160 576l320-320 42 42-248 248h526v60H274l248 248-42 42Z" />
								</svg>
							</button>
						</Link>
						Create Todo
					</h1>
					<form className="flex flex-col my-5" onSubmit={createTodo}>
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
						<label htmlFor="title" className="label font-bold ">
							Title
						</label>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="Title"
							className="input input-bordered input-primary w-full focus:border-none "
						/>

						<label htmlFor="description" className="label font-bold">
							Description
						</label>
						<input
							type="text"
							name="description"
							id="description"
							placeholder="Description"
							className="input input-bordered input-primary w-full  focus:border-none "
						/>

						<label htmlFor="dueDate" className="label font-bold">
							<span className="label-text">Due Date </span>
						</label>
						<input
							type="date"
							name="dueDate"
							id="dueDate"
							ref={dateRef}
							placeholder="25.05.2001"
							className="input input-bordered input-primary w-full  focus:border-none "
						/>
						<button
							className={` btn btn-secondary btn-block mt-5 ${
								isLoading ? "loading" : ""
							} `}
						>
							Create Todo
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTodo;
