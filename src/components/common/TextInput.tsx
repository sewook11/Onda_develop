import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function TextInput({
  label,
  icon,
  className,
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-2 font-sans text-main">
      {label && (
        <label
          htmlFor={props.name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-deep text-main placeholder-gray-500 ${
            icon ? "pr-10" : ""
          } ${className}`}
        />
      </div>
    </div>
  );
}
