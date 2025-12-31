import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Mail,
  Calendar,
  Package,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const UsersPage = () => {
  // Sample user data - replace with your API data
  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      dob: "1985-03-15",
      signupDate: "2023-01-15",
      orderCount: 12,
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      dob: "1990-07-22",
      signupDate: "2023-02-20",
      orderCount: 8,
      status: "active",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      dob: "1988-11-08",
      signupDate: "2023-03-10",
      orderCount: 25,
      status: "active",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      dob: "1992-05-30",
      signupDate: "2023-04-05",
      orderCount: 3,
      status: "inactive",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@email.com",
      dob: "1987-09-12",
      signupDate: "2023-05-18",
      orderCount: 18,
      status: "active",
    },
    {
      id: 6,
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      dob: "1991-12-03",
      signupDate: "2023-06-22",
      orderCount: 7,
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;
    const totalOrders = users.reduce((sum, user) => sum + user.orderCount, 0);
    const avgOrders =
      totalUsers > 0 ? (totalOrders / totalUsers).toFixed(1) : 0;

    return { totalUsers, activeUsers, totalOrders, avgOrders };
  }, [users]);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "signupDate" || sortField === "dob") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [users, searchTerm, sortField, sortDirection, filterStatus]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen glass p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">
            Manage and monitor your e-commerce users
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="glass rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.activeUsers}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="glass rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalOrders}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="glass rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Orders/User
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.avgOrders}
                </p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass rounded-lg shadow-sm border mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  text-black w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-1 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none glass"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 pointer-events-none" />
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="titanium-btn border-b">
                <tr>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:glass"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortField === "name" && sortDirection === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:glass"
                    onClick={() => handleSort("email")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortField === "email" && sortDirection === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:glass"
                    onClick={() => handleSort("dob")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Age</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortField === "dob" && sortDirection === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:glass"
                    onClick={() => handleSort("signupDate")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Signup Date</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortField === "signupDate" && sortDirection === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:glass"
                    onClick={() => handleSort("orderCount")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Orders</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortField === "orderCount" && sortDirection === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="glass divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {calculateAge(user.dob)} years
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(user.dob)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(user.signupDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">
                          {user.orderCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "glass text-gray-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No users found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
