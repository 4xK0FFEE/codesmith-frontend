"use client";

import { ProjectForm } from "./ProjectForm";

interface ProjectFormWrapperProps {
  projectType: string;
}

export default function ProjectFormWrapper({
  projectType,
}: ProjectFormWrapperProps) {
  const handleSubmit = async (data: any) => {
    const submissionTime = new Date().toISOString();

    console.group("Project Generation Details");
    console.log("Submission Timestamp (UTC):", submissionTime);
    console.log("Project Type:", projectType);
    console.log("User:", "a2ys");
    console.log("Form Data:", data);
    console.groupEnd();
  };

  return <ProjectForm projectType={projectType} onSubmit={handleSubmit} />;
}
