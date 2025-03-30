
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, Mail, Phone, Trash2 } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Sample coordinator data
const initialCoordinators = [
  { id: 1, name: "Alex Johnson", email: "alex.j@example.com", phone: "+1 (555) 111-2233" },
  { id: 2, name: "Maria Garcia", email: "maria.g@example.com", phone: "+1 (555) 222-3344" },
  { id: 3, name: "James Wilson", email: "james.w@example.com", phone: "+1 (555) 333-4455" },
  { id: 4, name: "Emma Davis", email: "emma.d@example.com", phone: "+1 (555) 444-5566" },
  { id: 5, name: "Daniel Martinez", email: "daniel.m@example.com", phone: "+1 (555) 555-6677" },
];

// Mock admin data matching the ids from UserManagement page
const adminDetails = [
  { id: 1, name: "John Smith", coordinators: [1, 2, 3, 4, 5] },
  { id: 2, name: "Sarah Johnson", coordinators: [1, 3, 5] },
  { id: 3, name: "Michael Brown", coordinators: [2, 4] },
  { id: 4, name: "Emily Davis", coordinators: [1, 2, 3, 4, 5, 6, 7] },
  { id: 5, name: "David Wilson", coordinators: [3] },
  { id: 6, name: "Jennifer Lee", coordinators: [1, 2, 3, 4] },
  { id: 7, name: "Robert Taylor", coordinators: [] },
];

const AdminDetails = () => {
  const { id } = useParams();
  const [coordinators, setCoordinators] = useState<typeof initialCoordinators>([]);
  const [admin, setAdmin] = useState<{ name: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const adminId = parseInt(id);
      const adminData = adminDetails.find(admin => admin.id === adminId);
      
      if (adminData) {
        setAdmin({ name: adminData.name });
        
        // Filter coordinators to only show those assigned to this admin
        const assignedCoordinators = initialCoordinators.filter(
          coord => adminData.coordinators.includes(coord.id)
        );
        setCoordinators(assignedCoordinators);
      }
    }
  }, [id]);

  const handleRemoveCoordinator = (coordinatorId: number) => {
    setCoordinators(coordinators.filter(coord => coord.id !== coordinatorId));
    
    toast({
      title: "Coordinator removed",
      description: "Coordinator has been removed from this admin.",
      duration: 3000
    });
  };

  return (
    <div className="space-y-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard/users">
                User Management
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{admin?.name || "Admin Details"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          {admin?.name}'s Coordinators
        </h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>Coordinators assigned to {admin?.name}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coordinators.length > 0 ? (
              coordinators.map(coordinator => (
                <TableRow key={coordinator.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    {coordinator.name}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {coordinator.email}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {coordinator.phone}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCoordinator(coordinator.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No coordinators found for this admin.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminDetails;
