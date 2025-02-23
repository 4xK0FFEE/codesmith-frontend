import { PROJECT_TYPES } from "@/config/projectQuestions";
import GeneratePageClient from "@/components/GeneratePageClient";

interface GeneratePageProps {
  params: {
    type: string;
  };
}

export default function GeneratePage({ params }: GeneratePageProps) {
  return <GeneratePageClient type={params.type} />;
}

export function generateStaticParams() {
  return Object.values(PROJECT_TYPES).map((type) => ({
    type,
  }));
}
