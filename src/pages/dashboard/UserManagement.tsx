import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, Phone, Users, Eye, MapPin } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Mock data for the user listing
const initialUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    mobile: "+1 (555) 123-4567",
    coordinators: 5,
    active: true
  }, {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    mobile: "+1 (555) 234-5678",
    coordinators: 3,
    active: true
  }, {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    mobile: "+1 (555) 345-6789",
    coordinators: 2,
    active: false
  }, {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    mobile: "+1 (555) 456-7890",
    coordinators: 7,
    active: true
  }, {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    mobile: "+1 (555) 567-8901",
    coordinators: 1,
    active: false
  }, {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    mobile: "+1 (555) 678-9012",
    coordinators: 4,
    active: true
  }, {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    mobile: "+1 (555) 789-0123",
    coordinators: 0,
    active: false
  }
];

// Mock data for tours created by admins
const adminTours = {
  1: [
    { id: 1, name: "Paris Adventure", date: "2023-06-12", participants: 15 },
    { id: 2, name: "Rome Exploration", date: "2023-08-20", participants: 8 },
    { id: 3, name: "Barcelona Weekend", date: "2023-09-05", participants: 12 },
  ],
  2: [
    { id: 4, name: "London Sightseeing", date: "2023-07-18", participants: 20 },
    { id: 5, name: "Amsterdam Canal Tour", date: "2023-10-10", participants: 10 }
  ],
  3: [
    { id: 6, name: "Berlin Historical", date: "2023-05-15", participants: 6 }
  ],
  4: [
    { id: 7, name: "Vienna Classical", date: "2023-11-25", participants: 18 },
    { id: 8, name: "Prague Castle Tour", date: "2023-12-05", participants: 14 },
    { id: 9, name: "Budapest River Cruise", date: "2024-01-10", participants: 22 }
  ],
  5: [],
  6: [
    { id: 10, name: "Athens Ancient Tour", date: "2023-08-30", participants: 12 }
  ],
  7: []
};

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<(typeof initialUsers)[0] | null>(null);
  
  const handleStatusChange = (id: number, checked: boolean) => {
    setUsers(users.map(user => user.id === id ? {
      ...user,
      active: checked
    } : user));
    toast({
      title: `User status updated`,
      description: `User has been ${checked ? 'activated' : 'deactivated'}.`,
      duration: 3000
    });
  };

  const handleAdminClick = (id: number) => {
    navigate(`/dashboard/users/${id}`);
  };

  const handleViewDetails = (admin: (typeof initialUsers)[0]) => {
    setSelectedAdmin(admin);
    setIsDrawerOpen(true);
  };

  return <div className="space-y-4">
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
            <BreadcrumbPage>User Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>List of all admin users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Admin Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead className="text-center">Coordinators</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">View Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => <TableRow key={user.id}>
                <TableCell 
                  className="font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={() => handleAdminClick(user.id)}
                >
                  <User className="h-4 w-4 text-gray-500" />
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {user.mobile}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    {user.coordinators}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Switch checked={user.active} onCheckedChange={checked => handleStatusChange(user.id, checked)} className={user.active ? "bg-green-500" : "bg-gray-300"} />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(user);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>

      {/* Admin Details Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="px-4 sm:max-w-md">
          <DrawerHeader>
            <DrawerTitle className="text-xl font-bold">Admin Details</DrawerTitle>
            <DrawerDescription>
              {selectedAdmin?.name}'s information and created tours
            </DrawerDescription>
          </DrawerHeader>
          
          {selectedAdmin && (
            <div className="px-4 py-2 space-y-6">
              {/* Admin Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm text-muted-foreground">Name:</div>
                  <div className="text-sm font-medium">{selectedAdmin.name}</div>
                  
                  <div className="text-sm text-muted-foreground">Email:</div>
                  <div className="text-sm font-medium break-all">{selectedAdmin.email}</div>
                  
                  <div className="text-sm text-muted-foreground">Phone:</div>
                  <div className="text-sm font-medium">{selectedAdmin.mobile}</div>
                  
                  <div className="text-sm text-muted-foreground">Status:</div>
                  <div className="text-sm font-medium">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${selectedAdmin.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {selectedAdmin.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">Team Size:</div>
                  <div className="text-sm font-medium">{selectedAdmin.coordinators} coordinators</div>
                </div>
              </div>
              
              {/* Created Tours */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Created Tours</h3>
                {adminTours[selectedAdmin.id]?.length > 0 ? (
                  <div className="space-y-3">
                    {adminTours[selectedAdmin.id].map(tour => (
                      <div key={tour.id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center gap-2 font-medium">
                          <MapPin className="h-4 w-4 text-blue-500" />
                          {tour.name}
                        </div>
                        <div className="mt-1 text-sm text-gray-600 flex justify-between">
                          <span>Date: {tour.date}</span>
                          <span>{tour.participants} participants</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 italic">No tours created yet</div>
                )}
              </div>
            </div>
          )}
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>;
};

export default UserManagement;
