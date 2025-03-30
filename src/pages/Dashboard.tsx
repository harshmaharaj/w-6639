
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome, {user?.name}</h2>
      <p className="text-gray-600">
        This is your dashboard. Use the sidebar menu to navigate through different sections.
      </p>
    </div>
  );
};

export default Dashboard;
