import { Users, Plus, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminPriestsPage() {
  const priests = [
    {
      id: 1,
      name: "Fr. John Smith",
      email: "fr.john@church.com",
      phone: "+1 (555) 100-0001",
      status: "Available",
      specializations: ["Baptism", "Wedding", "Confession"],
      appointments: 12,
    },
    {
      id: 2,
      name: "Fr. Michael Brown",
      email: "fr.michael@church.com",
      phone: "+1 (555) 100-0002",
      status: "Available",
      specializations: ["Mass", "First Communion", "Confirmation"],
      appointments: 8,
    },
    {
      id: 3,
      name: "Fr. David Wilson",
      email: "fr.david@church.com",
      phone: "+1 (555) 100-0003",
      status: "On Leave",
      specializations: ["Wedding", "Anointing", "Funeral"],
      appointments: 3,
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
            Priest Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage priest information and availability
          </p>
        </div>
        <Button className="bg-[#8B2635] hover:bg-[#6d1d28] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Priest
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priests.map((priest) => (
          <Card
            key={priest.id}
            className="border-0 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader className="border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#8B2635] flex items-center justify-center">
                    <span
                      className="text-white text-lg"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {priest.name.split(" ")[1].charAt(0)}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg text-[#1e3a5f]">
                      {priest.name}
                    </CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2 text-[#8B2635]" />
                  {priest.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-[#8B2635]" />
                  {priest.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-[#8B2635]" />
                  {priest.appointments} appointments
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500 mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {priest.specializations.map((spec, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <Badge
                  className={
                    priest.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                >
                  {priest.status}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[#8B2635] border-[#8B2635] hover:bg-[#8B2635] hover:text-white"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
