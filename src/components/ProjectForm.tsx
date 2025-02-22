"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PROJECT_TYPES, projectQuestions } from "@/config/projectQuestions";
import { InputType, type QuestionConfig } from "@/types/project";

type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

interface ProjectFormProps {
	projectType: ProjectType;
	onSubmit: (data: any) => void;
}

export const ProjectForm = ({ projectType, onSubmit }: ProjectFormProps) => {
	const router = useRouter();
	const { toast } = useToast();
	const [formState, setFormState] = useState<Record<string, any>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const questions = projectQuestions[projectType];

	const updateField = (id: string, value: any) => {
		setFormState((prev) => ({ ...prev, [id]: value }));
		if (errors[id]) {
			setErrors((prev) => ({ ...prev, [id]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};
		questions.forEach((question) => {
			if (question.required && !formState[question.id]) {
				newErrors[question.id] = "This field is required";
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formState);
			toast({
				title: "Project Configuration Submitted",
				description: "Your project is being generated...",
			});
		} else {
			toast({
				title: "Form Validation Failed",
				description: "Please check the form for errors and try again.",
				variant: "destructive",
			});
		}
	};

	const renderField = (question: QuestionConfig) => {
		switch (question.type) {
			case InputType.SELECT:
				return (
					<Select
						value={formState[question.id] || ""}
						onValueChange={(value) => updateField(question.id, value)}
					>
						<SelectTrigger>
							<SelectValue placeholder={`Select ${question.label}`} />
						</SelectTrigger>
						<SelectContent>
							{question.options?.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case InputType.CHECKBOX:
				return (
					<div className="flex items-center space-x-2">
						<Checkbox
							id={question.id}
							checked={formState[question.id] || false}
							onCheckedChange={(checked) => updateField(question.id, checked)}
						/>
						<label
							htmlFor={question.id}
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{question.description}
						</label>
					</div>
				);
			case InputType.TEXTAREA:
				return (
					<Textarea
						value={formState[question.id] || ""}
						onChange={(e) => updateField(question.id, e.target.value)}
						placeholder={question.label}
					/>
				);
			default:
				return (
					<Input
						value={formState[question.id] || ""}
						onChange={(e) => updateField(question.id, e.target.value)}
						placeholder={question.label}
					/>
				);
		}
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Configure Your {projectType} Project</CardTitle>
				<CardDescription>
					Fill in the details to generate your custom project
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent className="space-y-6">
					{questions.map((question) => (
						<div key={question.id} className="space-y-2">
							<Label htmlFor={question.id}>
								{question.label}
								{question.required && (
									<span className="text-destructive ml-1">*</span>
								)}
							</Label>
							{renderField(question)}
							{errors[question.id] && (
								<p className="text-sm text-destructive">
									{errors[question.id]}
								</p>
							)}
						</div>
					))}
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline" onClick={() => router.back()}>
						Back
					</Button>
					<Button type="submit">Generate Project</Button>
				</CardFooter>
			</form>
		</Card>
	);
};

export default function GenerateCustomProject() {
	const router = useRouter();
	const [projectType, setProjectType] = useState<ProjectType>(
		PROJECT_TYPES.FRONTEND
	);

	const handleProjectSubmit = (data: any) => {
		console.log("Project Configuration:", data);
		// Here you would typically send the data to your backend or process it further
		router.push("/project-generation-result");
	};

	return (
		<div className="container mx-auto py-10">
			<h1 className="text-3xl font-bold mb-6">Generate Custom Project</h1>
			<div className="mb-6">
				<Label htmlFor="projectType">Select Project Type</Label>
				<Select
					value={projectType}
					onValueChange={(value: ProjectType) => setProjectType(value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select project type" />
					</SelectTrigger>
					<SelectContent>
						{Object.entries(PROJECT_TYPES).map(([key, value]) => (
							<SelectItem key={key} value={value}>
								{value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<ProjectForm projectType={projectType} onSubmit={handleProjectSubmit} />
		</div>
	);
}
