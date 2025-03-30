
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
import { Map, Home, Calendar, Users } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const initialTours = [
  {
    id: 1,
    name: "Historic Downtown Tour",
    date: "2023-07-15",
    participants: 12,
    location: "New York City, NY",
    status: "scheduled",
  },
  {
    id: 2,
    name: "Wine Country Experience",
    date: "2023-07-22",
    participants: 8,
    location: "Napa Valley, CA",
    status: "scheduled",
  },
  {
    id: 3,
    name: "Mountain Hiking Adventure",
    date: "2023-07-18",
    participants: 6,
    location: "Aspen, CO",
    status: "cancelled",
  },
  {
    id: 4,
    name: "City Architecture Walk",
    date: "2023-07-05",
    participants: 15,
    location: "Chicago, IL",
    status: "completed",
  },
  {
    id: 5,
    name: "Coastal Sunset Tour",
    date: "2023-07-30",
    participants: 10,
    location: "San Diego, CA",
    status: "scheduled",
  },
];

const Tours = () => {
  const [tours] = useState(initialTours);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
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
            <BreadcrumbPage>All Tours</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Tour Management</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>List of all tours</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Tour Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  {tour.name}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {tour.date}
                </TableCell>
                <TableCell>{tour.location}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  {tour.participants}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(tour.status)}>
                    {tour.status}
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

export default Tours;
