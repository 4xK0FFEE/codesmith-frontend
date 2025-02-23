/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconType } from "react-icons/lib";

export enum InputType {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
  NUMBER = "number",
  TEXTAREA = "textarea",
}

export interface SelectOption {
  value: string;
  label: string;
  icon?: IconType;
}

export interface QuestionConfig {
  id: string;
  label: string;
  type: InputType;
  options?: SelectOption[];
  required: boolean;
  pattern?: string;
  patternError?: string;
  description?: string;
  defaultValue?: string | boolean | number;
}

export interface ProjectConfig {
  projectType: string;
  answers: Record<string, any>;
}
