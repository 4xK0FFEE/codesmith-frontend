"use client";

import { useState } from "react";
import {
	ArrowRight,
	Code2,
	Github,
	Layers,
	CloudLightningIcon as Lightning,
	Package,
	Sparkles,
	Wand2,
	Search,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
	const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
	const router = useRouter();

	const templates = [
		{
			id: "fullstack",
			name: "Full-Stack Web App",
			description: "Next.js, TypeScript, Prisma, PostgreSQL",
			icon: Layers,
			popular: true,
		},
		{
			id: "cli",
			name: "CLI Tool",
			description: "Go, Cobra, SQLite",
			icon: Code2,
			popular: false,
		},
		{
			id: "microservices",
			name: "Microservices",
			description: "Node.js, Docker, Kubernetes, MongoDB",
			icon: Package,
			popular: true,
		},
	];

	const features = [
		{
			title: "Smart Stack Selection",
			description:
				"AI-powered recommendations based on your project requirements",
			icon: Sparkles,
		},
		{
			title: "Instant Setup",
			description: "Get your project running in seconds, not hours",
			icon: Lightning,
		},
		{
			title: "Best Practices",
			description: "Pre-configured with industry standards and optimal tooling",
			icon: Wand2,
		},
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
			<Header />
			<main className="container mx-auto px-6 pb-16">
				{/* Hero Section */}
				<section className="py-20 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
							Hack faster.
							<span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
								{" "}
								Build better.
							</span>
						</h1>
						<p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
							CodeSmith is your intelligent project bootstrapper. Set up your
							tech stack in seconds with AI-powered recommendations and
							battle-tested templates.
						</p>
					</motion.div>

					<div className="flex flex-wrap items-center justify-center gap-4">
						<Button
							size="lg"
							className="gap-2"
							onClick={() => router.push("/generate")}
						>
							Generate Custom Project <ArrowRight className="h-4 w-4" />
						</Button>
						<Button
							size="lg"
							variant="outline"
							onClick={() => router.push("/explore")}
						>
							Explore Templates <Search className="ml-2 h-4 w-4" />
						</Button>
					</div>
				</section>

				{/* Features Section */}
				<section className="mb-20">
					<div className="grid gap-8 md:grid-cols-3">
						{features.map((feature) => (
							<motion.div
								key={feature.title}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="h-full"
							>
								<Card className="border-2 h-full flex flex-col transition-colors hover:border-primary/50">
									<CardHeader className="flex-grow flex flex-col">
										<feature.icon className="h-12 w-12 text-primary" />
										<CardTitle className="text-xl mt-4">
											{feature.title}
										</CardTitle>
										<CardDescription className="flex-grow mt-2">
											{feature.description}
										</CardDescription>
									</CardHeader>
								</Card>
							</motion.div>
						))}
					</div>
				</section>

				{/* Templates Section */}
				<section className="mx-auto max-w-4xl">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl font-bold">Quick Start Templates</h2>
						<p className="text-muted-foreground">
							Get started instantly with our pre-configured project templates
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{templates.map((template) => (
							<motion.div
								key={template.id}
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.3 }}
								whileHover={{ scale: 1.02 }}
								className="h-full"
							>
								<Card
									className={`relative cursor-pointer h-full flex flex-col transition-colors hover:border-primary/50 ${
										selectedTemplate === template.id ? "border-primary" : ""
									}`}
									onClick={() => setSelectedTemplate(template.id)}
								>
									{template.popular && (
										<span className="absolute -right-1 -top-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
											Popular
										</span>
									)}
									<CardHeader className="flex-grow">
										<template.icon className="h-8 w-8 text-primary" />
										<CardTitle className="mt-4">{template.name}</CardTitle>
										<CardDescription className="mt-2">
											{template.description}
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-0">
										<Button variant="secondary" className="w-full gap-2">
											Use Template
											<ArrowRight className="h-4 w-4" />
										</Button>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</section>

				{/* CTA Section */}
				<section className="mt-20 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 text-center">
					<h2 className="mb-4 text-2xl font-bold">Ready to start building?</h2>
					<p className="mb-8 text-muted-foreground">
						Join thousands of developers who trust CodeSmith for their project
						setup
					</p>
					<Button
						size="lg"
						className="gap-2"
						onClick={() => router.push("/explore")}
					>
						Explore All Templates <ArrowRight className="h-4 w-4" />
					</Button>
				</section>
			</main>
			<Footer />
		</div>
	);
}
