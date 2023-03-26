import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoContext from "./features/todos/todoContext";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import {
	BrowserRouter,
	Route,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ErorrPage from "./pages/ErrorPage";
import CreateTodo from "./pages/CreateTodo";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<RequireAuth loginPath="/login">
					<Dashboard />
				</RequireAuth>
			),
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <SignUp />,
		},
		{
			path: "/create",
			element: <CreateTodo />,
		},
	]);

	return (
		<div className="app">
			<AuthProvider
				authType={"cookie"}
				authName={"_auth"}
				cookieDomain={window.location.hostname}
				cookieSecure={window.location.protocol === "https:"}
			>
				<TodoContext>
					<RouterProvider router={router} />
				</TodoContext>
			</AuthProvider>
		</div>
	);
}

export default App;
