import React, { useEffect, useState } from "react";

export function CreatedToast(props: {
	removeToast: () => void;
	toast: { message: string; id: number };
}) {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		console.log("toast created");
		const interval = setInterval(() => {
			setProgress((prev) => prev + 20);
		}, 20);
		setTimeout(() => {
			props.removeToast();
		}, 2000);

		return () => {
			props.removeToast();

			clearInterval(interval);
		};
	}, []);

	return (
		<div className="alert alert-success">
			<div className="flex flex-col ">
				<div>
					<p>{props.toast.message}</p>
				</div>
				<progress
					className="progress w-full"
					value={progress}
					max="2000"
				></progress>
			</div>
		</div>
	);
}
