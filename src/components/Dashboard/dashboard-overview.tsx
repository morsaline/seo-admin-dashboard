import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/components/Dashboard/revenue-chart";
import { DollarSign, Users, UserCheck } from "lucide-react";
import UserListTable from "./user-list-table";

const statsData = [
  {
    title: "Total Revenue",
    value: "$16345426",
    icon: DollarSign,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    title: "Total Sponsors",
    value: "1260",
    icon: UserCheck,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    title: "Total User",
    value: "5426",
    icon: Users,
    iconColor: "text-blue-900",
    bgColor: "bg-blue-100",
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6 p-6 max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-md text-gray-500 mb-1">Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-full">
        {statsData.map((stat, index) => (
          <Card key={index} className="bg-white rounded-xl border py-4 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-white rounded-xl border py-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-500">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart />
        </CardContent>
      </Card>

      {/* User List */}
      <Card className="bg-white rounded-xl border py-6 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-orange-500">User List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UserListTable />
        </CardContent>
      </Card>
    </div>
  );
}
