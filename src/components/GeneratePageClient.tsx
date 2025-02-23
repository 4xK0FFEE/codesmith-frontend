"use client";

import { notFound, useRouter } from "next/navigation";
import ProjectFormWrapper from "@/components/ProjectFormWrapper";
import { PROJECT_TYPES } from "@/config/projectQuestions";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

function isValidProjectType(type: string): type is ProjectType {
  return Object.values(PROJECT_TYPES).includes(type as ProjectType);
}

interface GeneratePageClientProps {
  type: string;
}

export default function GeneratePageClient({ type }: GeneratePageClientProps) {
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [projectAuthor, setProjectAuthor] = useState("");
  const [projectAudience, setProjectAudience] = useState("");
  const [projectPlan, setProjectPlan] = useState("");

  useEffect(() => {
    const getLocalStorageInfo = () => {
      if (
        localStorage.getItem("projectName") &&
        localStorage.getItem("projectAuthor") &&
        localStorage.getItem("projectAudience") &&
        localStorage.getItem("projectPlan")
      ) {
        setProjectName(localStorage.getItem("projectName")!);
        setProjectAuthor(localStorage.getItem("projectAuthor")!);
        setProjectAudience(localStorage.getItem("projectAudience")!);
        setProjectPlan(localStorage.getItem("projectPlan")!);
      } else {
        router.push("/generate");
      }
    };

    getLocalStorageInfo();
  }, [router]);

  if (!isValidProjectType(type)) {
    notFound();
  }

  const projectType = type;

  if (!Object.values(PROJECT_TYPES).includes(projectType)) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="max-w-2xl mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">
          Configure Your{" "}
          {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project
        </h1>
        <ProjectFormWrapper projectType={projectType} />
      </div>
      <Footer />
    </div>
  );
}
