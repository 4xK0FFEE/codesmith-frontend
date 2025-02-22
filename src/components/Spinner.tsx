import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SpinnerProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  disabled?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({
  options,
  placeholder = "Select an option",
  className = "",
  onChange,
  value,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        spinnerRef.current &&
        !spinnerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const baseClassName = "relative min-w-72";
  const selectClassName = `${baseClassName} ${className}`;

  const handleSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={selectClassName} ref={spinnerRef}>
      <button
        type="button"
        className={`w-full px-4 py-2 text-left bg-white border-2 border-cosmic-text rounded-xl ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-blue-500"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          <ul className="py-1 overflow-auto max-h-60">
            {options.map((option) => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                  value === option.value ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Spinner;
