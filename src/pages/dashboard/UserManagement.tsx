
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { User, Phone, Users, Calendar, Mail } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Mock data for the user listing
const initialUsers = [{
  id: 1,
  name: "John Smith",
  email: "john.smith@example.com",
  mobile: "+1 (555) 123-4567",
  coordinators: 5,
  active: true,
  tours: ["Paris Adventure", "London Explorer", "Rome Getaway", "Barcelona Tour", "Amsterdam Weekend"]
}, {
  id: 2,
  name: "Sarah Johnson",
  email: "sarah.j@example.com",
  mobile: "+1 (555) 234-5678",
  coordinators: 3,
  active: true,
  tours: ["Sydney Discovery", "New Zealand Trek", "Tokyo Experience"]
}, {
  id: 3,
  name: "Michael Brown",
  email: "m.brown@example.com",
  mobile: "+1 (555) 345-6789",
  coordinators: 2,
  active: false,
  tours: ["Cairo Pyramids", "Marrakech Market"]
}, {
  id: 4,
  name: "Emily Davis",
  email: "emily.davis@example.com",
  mobile: "+1 (555) 456-7890",
  coordinators: 7,
  active: true,
  tours: ["New York City Tour", "Washington DC History", "Boston Freedom Trail"]
}, {
  id: 5,
  name: "David Wilson",
  email: "david.w@example.com",
  mobile: "+1 (555) 567-8901",
  coordinators: 1,
  active: false,
  tours: ["Berlin Wall Tour"]
}, {
  id: 6,
  name: "Jennifer Lee",
  email: "jennifer.lee@example.com",
  mobile: "+1 (555) 678-9012",
  coordinators: 4,
  active: true,
  tours: ["Dubai Desert Safari", "Abu Dhabi Grand Mosque", "Sharjah Culture", "Ras Al Khaimah Mountains"]
}, {
  id: 7,
  name: "Robert Taylor",
  email: "robert.t@example.com",
  mobile: "+1 (555) 789-0123",
  coordinators: 0,
  active: false,
  tours: []
}];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedAdmin, setSelectedAdmin] = useState<typeof initialUsers[0] | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
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

  const openAdminDrawer = (admin: typeof initialUsers[0], e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to the admin details page
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => <TableRow key={user.id}>
                <TableCell 
                  className="font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 hover:underline"
                  onClick={(e) => openAdminDrawer(user, e)}
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
              </TableRow>)}
          </TableBody>
        </Table>
      </div>

      {/* Admin Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-4 border-b">
            <SheetTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedAdmin?.name}
            </SheetTitle>
            <SheetDescription>
              Admin details and created tours
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{selectedAdmin?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{selectedAdmin?.mobile}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${selectedAdmin?.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{selectedAdmin?.active ? 'Active' : 'Inactive'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Team</h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{selectedAdmin?.coordinators} Coordinators</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Created Tours</h3>
              {selectedAdmin?.tours && selectedAdmin.tours.length > 0 ? (
                <ul className="space-y-2">
                  {selectedAdmin.tours.map((tour, index) => (
                    <li key={index} className="flex items-center gap-2 p-2 rounded bg-gray-50">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{tour}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No tours created yet.</p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>;
};

export default UserManagement;
