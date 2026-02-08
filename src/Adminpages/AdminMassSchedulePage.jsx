import { Church, Plus, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminMassSchedulePage() {
  const massSchedules = [
    {
      id: 1,
      day: "Sunday",
      time: "8:00 AM",
      type: "Sunday Mass",
      priest: "Fr. John Smith",
      language: "English",
      capacity: 200,
    },
    {
      id: 2,
      day: "Sunday",
      time: "10:00 AM",
      type: "Sunday Mass",
      priest: "Fr. Michael Brown",
      language: "English",
      capacity: 200,
    },
    {
      id: 3,
      day: "Sunday",
      time: "12:00 PM",
      type: "Sunday Mass",
      priest: "Fr. David Wilson",
      language: "Spanish",
      capacity: 200,
    },
    {
      id: 4,
      day: "Monday",
      time: "7:00 AM",
      type: "Weekday Mass",
      priest: "Fr. John Smith",
      language: "English",
      capacity: 100,
    },
    {
      id: 5,
      day: "Monday",
      time: "6:00 PM",
      type: "Evening Mass",
      priest: "Fr. Michael Brown",
      language: "English",
      capacity: 150,
    },
    {
      id: 6,
      day: "Saturday",
      time: "5:00 PM",
      type: "Vigil Mass",
      priest: "Fr. David Wilson",
      language: "English",
      capacity: 200,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2
            className="text-2xl text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Mass Schedule Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage mass times and assignments
          </p>
        </div>
        <Button className="bg-[#8B2635] hover:bg-[#6d1d28] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Mass
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle
            className="text-[#1e3a5f]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Priest
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {massSchedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Church className="w-5 h-5 text-[#8B2635] mr-2" />
                        <span className="text-sm text-gray-900">
                          {schedule.day}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {schedule.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline">{schedule.type}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.priest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {schedule.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">
                          {schedule.capacity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button size="sm" variant="outline" className="mr-2">
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
