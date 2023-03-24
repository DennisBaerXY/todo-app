import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoContext from "./Context/todoContext";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import {
	BrowserRouter,
	Route,
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import ErorrPage from "./Components/ErrorPage";

function App() {
	const [count, setCount] = useState(0);

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
