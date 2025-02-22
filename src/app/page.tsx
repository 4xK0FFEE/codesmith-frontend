"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";
import TextLink from "@/components/TextLink";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("");

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    alert(`Input value: ${inputValue}`);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {/* <span className="text-9xl font-black text-cosmic-text">Hello</span> */}
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Your Text"
      />
      <Button text="Submit" onClick={handleButtonClick} className="mt-4" />
      <Card
        text="My Card"
        description="This is my card."
        className="mt-4"
        buttonText="Button"
      />
      <TextLink text="My Link" href="https://youtube.com" className="mt-4" />
      <Spinner
        options={options}
        placeholder="Select an option..."
        className="mt-4"
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
    </div>
  );
}
