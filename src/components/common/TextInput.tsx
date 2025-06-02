import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col gap-2 font-sans text-main">
      <label htmlFor={props.name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-deep text-main placeholder-gray-500"
      />
    </div>
  );
}
