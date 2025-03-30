
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
import { User, Mail, Phone, Trash2, Users, Plane } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample coordinator data
const initialCoordinators = [
  { id: 1, name: "Alex Johnson", email: "alex.j@example.com", phone: "+1 (555) 111-2233" },
  { id: 2, name: "Maria Garcia", email: "maria.g@example.com", phone: "+1 (555) 222-3344" },
  { id: 3, name: "James Wilson", email: "james.w@example.com", phone: "+1 (555) 333-4455" },
  { id: 4, name: "Emma Davis", email: "emma.d@example.com", phone: "+1 (555) 444-5566" },
  { id: 5, name: "Daniel Martinez", email: "daniel.m@example.com", phone: "+1 (555) 555-6677" },
];

// Sample traveller data
const initialTravellers = [
  { id: 1, name: "John Doe", email: "john.d@example.com", destination: "Paris, France" },
  { id: 2, name: "Jane Smith", email: "jane.s@example.com", destination: "Tokyo, Japan" },
  { id: 3, name: "Robert Brown", email: "robert.b@example.com", destination: "Sydney, Australia" },
  { id: 4, name: "Lisa Johnson", email: "lisa.j@example.com", destination: "Rome, Italy" },
  { id: 5, name: "Michael Lee", email: "michael.l@example.com", destination: "Cairo, Egypt" },
];

// Mock admin data matching the ids from UserManagement page
const adminDetails = [
  { id: 1, name: "John Smith", coordinators: [1, 2, 3, 4, 5], travellers: [1, 2, 3, 4, 5] },
  { id: 2, name: "Sarah Johnson", coordinators: [1, 3, 5], travellers: [1, 3, 5] },
  { id: 3, name: "Michael Brown", coordinators: [2, 4], travellers: [2, 4] },
  { id: 4, name: "Emily Davis", coordinators: [1, 2, 3, 4, 5, 6, 7], travellers: [1, 2, 3] },
  { id: 5, name: "David Wilson", coordinators: [3], travellers: [3, 4] },
  { id: 6, name: "Jennifer Lee", coordinators: [1, 2, 3, 4], travellers: [1, 5] },
  { id: 7, name: "Robert Taylor", coordinators: [], travellers: [] },
];

const AdminDetails = () => {
  const { id } = useParams();
  const [coordinators, setCoordinators] = useState<typeof initialCoordinators>([]);
  const [travellers, setTravellers] = useState<typeof initialTravellers>([]);
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

        // Filter travellers to only show those assigned to this admin
        const assignedTravellers = initialTravellers.filter(
          traveller => adminData.travellers.includes(traveller.id)
        );
        setTravellers(assignedTravellers);
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

  const handleRemoveTraveller = (travellerId: number) => {
    setTravellers(travellers.filter(traveller => traveller.id !== travellerId));
    
    toast({
      title: "Traveller removed",
      description: "Traveller has been removed from this admin.",
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
          {admin?.name}'s Dashboard
        </h1>
      </div>
      
      <Tabs defaultValue="coordinators" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="coordinators" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Coordinators
          </TabsTrigger>
          <TabsTrigger value="travellers" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            Travellers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="coordinators" className="mt-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableCaption>Coordinators assigned to {admin?.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-center">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coordinators.length > 0 ? (
                  coordinators.map(coordinator => (
                    <TableRow key={coordinator.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          {coordinator.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {coordinator.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          {coordinator.phone}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveCoordinator(coordinator.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
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
        </TabsContent>
        
        <TabsContent value="travellers" className="mt-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableCaption>Travellers assigned to {admin?.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead className="text-center">Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {travellers.length > 0 ? (
                  travellers.map(traveller => (
                    <TableRow key={traveller.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          {traveller.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          {traveller.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4 text-gray-500" />
                          {traveller.destination}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTraveller(traveller.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      No travellers found for this admin.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDetails;
