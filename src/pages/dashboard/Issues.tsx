
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Bug, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const initialIssues = [
  {
    id: 1,
    title: "Login page shows error after session timeout",
    reportedBy: "John Smith",
    severity: "high",
    status: "open",
    createdAt: "2023-06-12",
  },
  {
    id: 2,
    title: "Map not loading in Safari browser",
    reportedBy: "Sarah Johnson", 
    severity: "medium",
    status: "in-progress",
    createdAt: "2023-06-15",
  },
  {
    id: 3,
    title: "User profile image upload failing",
    reportedBy: "Michael Brown",
    severity: "medium",
    status: "open",
    createdAt: "2023-06-18",
  },
  {
    id: 4,
    title: "PDF export missing footer details",
    reportedBy: "Emily Davis",
    severity: "low",
    status: "resolved",
    createdAt: "2023-06-20",
  },
  {
    id: 5,
    title: "Tour scheduling calendar showing incorrect dates",
    reportedBy: "David Wilson",
    severity: "high",
    status: "open",
    createdAt: "2023-06-22",
  },
];

const Issues = () => {
  const [issues] = useState(initialIssues);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in-progress":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Issues</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Issues Management</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>List of reported issues</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Issue</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Bug className="h-4 w-4 text-gray-500" />
                  {issue.title}
                </TableCell>
                <TableCell>{issue.reportedBy}</TableCell>
                <TableCell>{issue.createdAt}</TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status.replace("-", " ")}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Issues;
