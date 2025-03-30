
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerTitle: string;
  headerSubtitle: string;
}

const AuthLayout = ({
  title,
  description,
  children,
  footer,
  headerTitle,
  headerSubtitle,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-900">{headerTitle}</h1>
          <p className="text-gray-600 mt-2">{headerSubtitle}</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-medium">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          {footer && (
            <CardFooter className="flex justify-center">
              {footer}
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
