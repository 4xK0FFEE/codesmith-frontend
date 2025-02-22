"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";

export default function Home() {
	const router = useRouter(); // Initialize router

	const [projectName, setProjectName] = useState("");
	const [projectAuthor, setProjectAuthor] = useState("");
	const [projectAudience, setProjectAudience] = useState("");
	const [projectPlan, setProjectPlan] = useState("");

	// Load data from localStorage when component mounts
	useEffect(() => {
		setProjectName(localStorage.getItem("projectName") || "");
		setProjectAuthor(localStorage.getItem("projectAuthor") || "");
		setProjectAudience(localStorage.getItem("projectAudience") || "");
		setProjectPlan(localStorage.getItem("projectPlan") || "");
	}, []);

	// Save data to localStorage on change
	const saveToLocalStorage = () => {
		localStorage.setItem("projectName", projectName);
		localStorage.setItem("projectAuthor", projectAuthor);
		localStorage.setItem("projectAudience", projectAudience);
		localStorage.setItem("projectPlan", projectPlan);
	};

	// Handle project type selection
	const handleTrackSelection = (track: string) => {
		saveToLocalStorage(); // Save data before navigation
		router.push(`/generate/${track}`); // Navigate to the selected track
	};

	const options = [
		{ value: "small", label: "Small (1-100 people)" },
		{ value: "medium", label: "Medium (100-1000 people)" },
		{ value: "large", label: "Large (1000+ people)" },
	];

	const handleSubmit = () => {
		saveToLocalStorage();
		console.log("Project Name:", projectName);
		console.log("Project Author:", projectAuthor);
		console.log("Audience:", projectAudience);
		console.log("Project Plan:", projectPlan);
	};

	return (
		<div className="w-screen h-screen flex flex-col justify-start items-start p-4">
			<h1 className="text-xl font-bold mb-4">Create Your Project</h1>

			{/* Input Fields */}
			<label className="mb-1">Project Name</label>
			<Input
				value={projectName}
				onChange={(e) => setProjectName(e.target.value)}
				placeholder="Project Name"
				className="mb-2"
			/>

			<label className="mb-1">Project Author</label>
			<Input
				value={projectAuthor}
				onChange={(e) => setProjectAuthor(e.target.value)}
				placeholder="Project Author"
				className="mb-2"
			/>

			<label className="mb-1">Audience Reach</label>
			<Spinner
				options={options}
				placeholder="Select an option..."
				className="mb-2"
				value={projectAudience}
				onChange={(value) => setProjectAudience(value)}
			/>

			<label className="mb-1">Project Plan</label>
			<Input
				value={projectPlan}
				onChange={(e) => setProjectPlan(e.target.value)}
				placeholder="Describe your project..."
				className="mb-4"
			/>

			<Button text="Submit" onClick={handleSubmit} className="mt-4" />
			<p className="mt-8 mb-4 text-xl font-bold">Continue with a track</p>

			{/* Project Type Tiles */}
			<div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{[
					{
						text: "Frontend",
						desc: "Build a UI-focused project",
						url: "frontend",
					},
					{
						text: "Backend",
						desc: "Set up APIs and databases",
						url: "backend",
					},
					{
						text: "Full-Stack",
						desc: "Combine frontend & backend",
						url: "fullstack",
					},
					{ text: "CLI Tool", desc: "Command-line based projects", url: "cli" },
					{
						text: "Mobile App",
						desc: "Build Android & iOS apps",
						url: "mobile",
					},
					{ text: "ML Model", desc: "Train & deploy ML models", url: "ai-ml" },
					{
						text: "Game Dev",
						desc: "Develop games & simulations",
						url: "game-dev",
					},
					{
						text: "API Service",
						desc: "Microservices & REST APIs",
						url: "devops",
					},
				].map((track) => (
					<Card
						key={track.text}
						text={track.text}
						description={track.desc}
						buttonText="Select"
						onClick={() => handleTrackSelection(track.url)} // Lowercase for cleaner URLs
					/>
				))}
			</div>
		</div>
	);
}
	