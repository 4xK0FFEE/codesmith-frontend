"use client";

import { PROJECT_TYPES } from "@/config/projectQuestions";
import { ProjectForm } from "./ProjectForm";

type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

interface ProjectFormWrapperProps {
  projectType: ProjectType;
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
