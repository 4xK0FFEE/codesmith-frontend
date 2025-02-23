/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { ProjectConfig } from "@/types/project";
import { PROJECT_TYPES, projectQuestions } from "@/config/projectQuestions";

type ProjectType = (typeof PROJECT_TYPES)[keyof typeof PROJECT_TYPES];

export const useProjectForm = (projectType: ProjectType) => {
  const [formState, setFormState] = useState<ProjectConfig>({
    projectType,
    answers: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    (fieldId: string, value: any) => {
      setFormState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [fieldId]: value,
        },
      }));

      if (errors[fieldId]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const questions = projectQuestions[projectType];
    const newErrors: Record<string, string> = {};

    questions.forEach((question) => {
      const value = formState.answers[question.id];

      if (question.required && !value) {
        newErrors[question.id] = `${question.label} is required`;
      }

      if (question.pattern && typeof value === "string") {
        const regex = new RegExp(question.pattern);
        if (!regex.test(value)) {
          newErrors[question.id] = question.patternError || "Invalid format";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, projectType]);

  const submitForm = useCallback(async () => {
    console.group("Form Validation Process");
    const isValid = validateForm();
    console.log("Form Validation Status:", isValid ? "Valid" : "Invalid");

    if (!isValid) {
      console.log("Validation Errors:", errors);
      console.groupEnd();
      return null;
    }

    const result = {
      timestamp: new Date().toISOString(),
      projectType,
      formData: formState,
      metadata: {
        user: "a2ys",
        version: "1.0.0",
      },
    };

    console.log("Submission Data:", result);
    console.groupEnd();
    return result;
  }, [formState, projectType, validateForm, errors]);

  return {
    formState,
    updateField,
    errors,
    validateForm,
    submitForm,
  };
};
