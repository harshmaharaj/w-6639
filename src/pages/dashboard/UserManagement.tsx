
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { User, Phone, Users } from "lucide-react";

// Mock data for the user listing
const initialUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    mobile: "+1 (555) 123-4567",
    coordinators: 5,
    active: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    mobile: "+1 (555) 234-5678",
    coordinators: 3,
    active: true,
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "m.brown@example.com",
    mobile: "+1 (555) 345-6789",
    coordinators: 2,
    active: false,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    mobile: "+1 (555) 456-7890",
    coordinators: 7,
    active: true,
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.w@example.com",
    mobile: "+1 (555) 567-8901",
    coordinators: 1,
    active: false,
  },
  {
    id: 6,
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    mobile: "+1 (555) 678-9012",
    coordinators: 4,
    active: true,
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert.t@example.com",
    mobile: "+1 (555) 789-0123",
    coordinators: 0,
    active: false,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const { toast } = useToast();

  const handleStatusChange = (id: number, checked: boolean) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, active: checked } : user
    ));
    
    toast({
      title: `User status updated`,
      description: `User has been ${checked ? 'activated' : 'deactivated'}.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-4">
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium flex items-center gap-2">
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
                    <Switch 
                      checked={user.active}
                      onCheckedChange={(checked) => handleStatusChange(user.id, checked)}
                      className={user.active ? "bg-green-500" : "bg-gray-300"}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
