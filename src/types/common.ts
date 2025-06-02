export interface ButtonProps{
  className?: string;
  color?: "primary" | "gray" | "accent" | "red";
  variant?: "fill" | "outline"; 
  width?: string;
  height?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  error?: string;
  clasName: string;
}

export interface ModalProps {
  modalKey: string;
  children: React.ReactNode;
  className?: string;
}

export interface CommonInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password" | "number";
}

export interface IconButtonProps {
  onClick: () => void;
  size: number;
  className?: string;
}
