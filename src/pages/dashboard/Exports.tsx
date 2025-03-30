
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
import { FileText, Home, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const initialExports = [
  {
    id: 1,
    name: "Q2 Financial Report",
    format: "PDF",
    createdAt: "2023-06-30",
    size: "1.2 MB",
    status: "completed",
  },
  {
    id: 2,
    name: "User Activity Data",
    format: "CSV",
    createdAt: "2023-06-25",
    size: "3.8 MB",
    status: "completed",
  },
  {
    id: 3,
    name: "Tour Analytics 2023",
    format: "XLSX",
    createdAt: "2023-06-28",
    size: "2.5 MB",
    status: "processing",
  },
  {
    id: 4,
    name: "Customer Feedback Summary",
    format: "PDF",
    createdAt: "2023-06-15",
    size: "890 KB",
    status: "completed",
  },
  {
    id: 5,
    name: "Monthly Sales Report",
    format: "XLSX",
    createdAt: "2023-06-01",
    size: "1.5 MB",
    status: "failed",
  },
];

const Exports = () => {
  const [exports] = useState(initialExports);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  const getFormatIcon = (format: string) => {
    return <FileText className="h-4 w-4 text-gray-500" />;
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
            <BreadcrumbPage>Exports</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Export Management</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>List of all exports</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Export Name</TableHead>
              <TableHead>Format</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exports.map((exportItem) => (
              <TableRow key={exportItem.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  {getFormatIcon(exportItem.format)}
                  {exportItem.name}
                </TableCell>
                <TableCell>{exportItem.format}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {exportItem.createdAt}
                </TableCell>
                <TableCell>{exportItem.size}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(exportItem.status)}>
                    {exportItem.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={exportItem.status !== "completed"}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Exports;
