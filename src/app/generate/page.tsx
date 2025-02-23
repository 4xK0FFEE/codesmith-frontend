"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Header from "@/components/Header";

export default function GenerateCustomProject() {
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [projectAuthor, setProjectAuthor] = useState("");
  const [projectAudience, setProjectAudience] = useState("");
  const [projectPlan, setProjectPlan] = useState("");
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const getAllTemplates = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/templates/all"
        );
        setTemplates(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    getAllTemplates();

    // Load data from localStorage
    setProjectName(localStorage.getItem("projectName") || "");
    setProjectAuthor(localStorage.getItem("projectAuthor") || "");
    setProjectAudience(localStorage.getItem("projectAudience") || "");
    setProjectPlan(localStorage.getItem("projectPlan") || "");
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("projectName", projectName);
    localStorage.setItem("projectAuthor", projectAuthor);
    localStorage.setItem("projectAudience", projectAudience);
    localStorage.setItem("projectPlan", projectPlan);
  };

  const handleTrackSelection = (track: string) => {
    saveToLocalStorage();
    router.push(`/generate/${track}`);
  };

  const handleSubmit = () => {
    saveToLocalStorage();
    console.log("Project Name:", projectName);
    console.log("Project Author:", projectAuthor);
    console.log("Audience:", projectAudience);
    console.log("Project Plan:", projectPlan);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-10">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Generate Your Project</CardTitle>
            <CardDescription>
              Fill in the details to generate your custom project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectAuthor">Project Author</Label>
              <Input
                id="projectAuthor"
                value={projectAuthor}
                onChange={(e) => setProjectAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectAudience">Audience Reach</Label>
              <Select
                value={projectAudience}
                onValueChange={setProjectAudience}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select audience size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (1-100 people)</SelectItem>
                  <SelectItem value="medium">
                    Medium (100-1000 people)
                  </SelectItem>
                  <SelectItem value="large">Large (1000+ people)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectPlan">Project Plan</Label>
              <Textarea
                id="projectPlan"
                value={projectPlan}
                onChange={(e) => setProjectPlan(e.target.value)}
                placeholder="Describe your project..."
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </CardFooter>
        </Card>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Continue with a track for a more personalized project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[
              {
                text: "Frontend",
                desc: "Build a UI-focused project",
                url: "frontend",
              },
              {
                text: "Backend",
                desc: "Set up APIs and databases",
                url: "backend",
              },
              {
                text: "Full-Stack",
                desc: "Combine frontend & backend",
                url: "fullstack",
              },
              {
                text: "CLI Tool",
                desc: "Command-line based projects",
                url: "cli",
              },
              {
                text: "Mobile App",
                desc: "Build Android & iOS apps",
                url: "mobile",
              },
              {
                text: "AI-ML",
                desc: "Machine learning & AI projects",
                url: "ai-ml",
              },
              {
                text: "Game Dev",
                desc: "Develop games & simulations",
                url: "game-dev",
              },
              {
                text: "DevOps",
                desc: "CI/CD & automation projects",
                url: "devops",
              },
            ].map((track) => (
              <Card
                key={track.text}
                className="cursor-pointer hover:border-primary transition-colors"
              >
                <CardHeader>
                  <CardTitle>{track.text}</CardTitle>
                  <CardDescription>{track.desc}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    onClick={() => handleTrackSelection(track.url)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
