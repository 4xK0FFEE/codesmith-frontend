"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Template {
  id: number;
  name: string;
  description: string;
  project_type: string;
  tags: string[];
}

const projectTypes = [
  { value: "All", label: "All" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile" },
  { value: "ai-ml", label: "AI-ML" },
  { value: "game-dev", label: "GameDev" },
  { value: "cli", label: "CLI" },
  { value: "devops", label: "DevOps" },
];

export default function ExploreTemplates() {
  const router = useRouter();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        setTemplates(data);
        setFilteredTemplates(data);
      });
  }, []);

  useEffect(() => {
    const filtered = templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesType =
        selectedType === "All" || template.project_type === selectedType;
      const matchesLanguage =
        selectedLanguage === "All" || template.tags.includes(selectedLanguage);
      return matchesSearch && matchesType && matchesLanguage;
    });
    setFilteredTemplates(filtered);
  }, [searchTerm, selectedType, selectedLanguage, templates]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <div className="container mx-auto py-10 px-4 flex-grow">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-8 text-center mb-4"
        >
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Explore
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {" "}
              Templates
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
            Discover a wide range of project templates to kickstart your
            development. From full-stack applications to specialized tools, find
            the perfect starting point for your next project.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 mb-8"
        >
          <div className="relative">
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.1 * (index % 3) + 0.5,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="flex flex-col h-full hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">{template.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {template.project_type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => router.push(`/template/${template.id}`)}
                    className="w-full"
                  >
                    View Template
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <p className="text-2xl font-semibold text-muted-foreground">
              No templates found matching your criteria.
            </p>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters, or generate one for
              yourself.
            </p>
            <Button
              variant="default"
              className="mt-4"
              onClick={() => router.push("/generate")}
            >
              Generate Project
            </Button>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}
