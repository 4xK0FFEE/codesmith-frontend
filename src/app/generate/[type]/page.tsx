import { notFound } from "next/navigation";
import ProjectFormWrapper from "@/components/ProjectFormWrapper";
import { PROJECT_TYPES } from "@/config/projectQuestions";

interface GeneratePageProps {
  params: {
    type: string;
  };
}

export default function GeneratePage({ params }: GeneratePageProps) {
  const projectType = params.type;

  if (!Object.values(PROJECT_TYPES).includes(projectType)) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Configure Your{" "}
        {projectType.charAt(0).toUpperCase() + projectType.slice(1)} Project
      </h1>
      <ProjectFormWrapper projectType={projectType} />
    </div>
  );
}

export function generateStaticParams() {
  return Object.values(PROJECT_TYPES).map((type) => ({
    type,
  }));
}
