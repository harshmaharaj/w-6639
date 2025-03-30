
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would call an API to send a reset link
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Email sent",
        description: "If your email is registered, you'll receive a reset link",
      });
    }, 1500);
  };

  return (
    <AuthLayout
      headerTitle="Reset Password"
      headerSubtitle="We'll send you instructions to reset your password"
      title="Forgot Password"
      description="Enter your email to receive a reset link"
      footer={
        <Link 
          to="/login" 
          className="flex items-center text-purple-600 hover:text-purple-800 font-medium gap-1"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      }
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput
            id="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <AuthButton isLoading={isLoading}>
            Send Reset Link
          </AuthButton>
        </form>
      ) : (
        <div className="text-center py-4">
          <div className="mb-4 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to <span className="font-medium">{email}</span>
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setIsSubmitted(false)}
          >
            Try a different email
          </Button>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
