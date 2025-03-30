
import React from "react";
import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const AuthButton = ({
  type = "submit",
  isLoading = false,
  children,
  onClick,
  className = "",
}: AuthButtonProps) => {
  return (
    <Button
      type={type}
      className={`w-full bg-purple-600 hover:bg-purple-700 text-white ${className}`}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default AuthButton;
