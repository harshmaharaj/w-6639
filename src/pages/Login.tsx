
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import AuthLayout from "@/components/AuthLayout";
import AuthInput from "@/components/AuthInput";
import AuthButton from "@/components/AuthButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      headerTitle="Welcome Back"
      headerSubtitle="Log in to access your account"
      title="Login"
      description="Enter your credentials to continue"
      footer={
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          id="email"
          label="Email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
              Forgot password?
            </Link>
          </div>
          <AuthInput
            id="password"
            label=""
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        </div>
        
        <AuthButton isLoading={isLoading}>
          <div className="flex items-center justify-center gap-2">
            Sign in <ArrowRight size={16} />
          </div>
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default Login;
