"use client";

import { useProjectForm } from "@/hooks/useProjectForm";
import { projectQuestions } from "@/config/projectQuestions";
import { InputType, QuestionConfig } from "@/types/project";
import Button from "./Button";
import Spinner from "./Spinner";
import Checkbox from "./Checkbox";
import Input from "./Input";

interface ProjectFormProps {
  projectType: string;
  onSubmit: (data: any) => void;
}

export const ProjectForm = ({ projectType, onSubmit }: ProjectFormProps) => {
  const { formState, updateField, errors, submitForm } =
    useProjectForm(projectType);
  const questions = projectQuestions[projectType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.group("Form Submission Attempt");
    console.log("Raw Form State:", formState);

    const result = await submitForm();

    if (result) {
      console.log("Form Validation:", "Success");
      console.groupEnd();
      onSubmit({
        projectConfiguration: formState,
        validationResult: result,
      });
    } else {
      console.log("Form Validation:", "Failed");
      console.log("Validation Errors:", errors);
      console.groupEnd();
    }
  };

  const renderField = (question: QuestionConfig) => {
    switch (question.type) {
      case InputType.SELECT:
        return (
          <Spinner
            options={question.options || []}
            placeholder={`Select ${question.label}`}
            value={formState.answers[question.id] || ""}
            onChange={(value) => updateField(question.id, value)}
            className="w-full"
          />
        );

      case InputType.CHECKBOX:
        return (
          <Checkbox
            checked={formState.answers[question.id] || false}
            onChange={(checked) => updateField(question.id, checked)}
            label={question.description}
          />
        );

      default:
        return (
          <Input
            value={formState.answers[question.id] || ""}
            onChange={(e) => updateField(question.id, e.target.value)}
            placeholder={question.label}
            className="w-full"
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question) => (
        <div key={question.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <label
              htmlFor={question.id}
              className="block text-lg font-medium text-cosmic-text"
            >
              {question.label}
              {question.required && (
                <span className="ml-1 text-red-500">*</span>
              )}
            </label>
          </div>
          {renderField(question)}
          {errors[question.id] && (
            <p className="text-sm text-red-500 mt-1">{errors[question.id]}</p>
          )}
        </div>
      ))}
      <Button text="Generate Project" />
    </form>
  );
};
