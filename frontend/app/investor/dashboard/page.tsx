"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import {
  CreateMeating,
  getMeetings,
  getRequestedMeetings,
  getStartups,
} from "@/actions/investor";
import Investments from "./components/investments";
import Meetings from "./components/meetings";
import { Company } from "@/types";
import { ReqMeeting } from "./components/ReqMeetingDialog";
import { ThreeDots } from "react-loader-spinner";

const industries = [
  "ALL",
  "IT",
  "HEALTH",
  "FINANCE",
  "AGRICULTURE",
  "EDUCATION",
  "ENERGY",
  "TRANSPORT",
  "MANUFACTURING",
  "RETAIL",
  "REAL_ESTATE",
  "TOURISM",
  "ENTERTAINMENT",
  "OTHER",
];

export default function InvestorDashboard() {
  const { user, fetchUser, logout } = useAuthContext();
  const [industry, setIndustry] = useState("ALL");
  const [meets, setMeets] = useState(null);
  const [reqMeets, setReqMeets] = useState(null);
  const [startups, setStartups] = useState<Company[] | null>(null);
  useEffect(() => {
    fetchStartup();
  }, [user, industry, setIndustry]);
  const fetchStartup = async () => {
    if (!user) {
      await fetchUser();
    }
    if (user) {
      const data = await getStartups(industry);
      const meetings = await getMeetings();
      const reqMeetings = await getRequestedMeetings();
      if (data) {
        setStartups(data);
        console.log("meet", meetings, "req", reqMeetings);
        if (meetings) {
          setMeets(meetings);
        }
        if (reqMeetings) {
          setReqMeets(reqMeetings);
        }
      } else {
      }
    }
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
  };

  

  if (!startups) {
    return (
      <>
        <div className="h-4"></div>
        <div className="absolute w-full flex justify-center h-screen items-center">
            <ThreeDots height={40} color="#93c5fd" />
        </div>
        <div className="h-4"></div>
    </>
    );
  }

  return (
    <div className="p-8 bg-gray-100 w-full">
      <h1 className="text-4xl font-bold mb-8">Investor Dashboard</h1>

      <Tabs defaultValue="startups" className="mb-8">
        <TabsList>
          <TabsTrigger value="startups">Startups</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="startups">
          <Card>
            <CardHeader>
              <CardTitle>Startup Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="w-full md:w-48">
                  <Select onValueChange={handleIndustryChange} value={industry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startup Name</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead className="text-right">
                        Funding Procured
                      </TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {startups?.map((startup) => (
                      <TableRow key={startup.id}>
                        <TableCell className="font-medium">
                          {startup?.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {startup?.industry.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <a
                            href={startup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:underline"
                          >
                            {startup?.website}{" "}
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          ${startup?.funding.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <ReqMeeting startupID={startup?.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings">
          <Meetings meetings={meets} reqMeetings={ reqMeets } />
        </TabsContent>

        <TabsContent value="investments">
          <Investments />
        </TabsContent>
      </Tabs>
    </div>
  );
}
