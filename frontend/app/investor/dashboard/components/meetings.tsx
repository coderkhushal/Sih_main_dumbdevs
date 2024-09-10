import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteMeeting } from "@/actions/investor";

function Meetings({ meetings, reqMeetings }: any) {
  const meets = [...meetings, ...reqMeetings];

  const delMeeting = async (id: number) => {
    const data = await DeleteMeeting(id);
    console.log(data)
    alert(`heelo ji:,${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Startup Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meets.map((meeting) => (
              <TableRow key={meeting?.StartupId}>
                <TableCell>{meeting?.startupName}</TableCell>
                <TableCell>
                  {new Date(meeting.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      meeting?.status === "Confirmed" ? "secondary" : "outline"
                    }
                  >
                    {meeting?.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button onClick={() => delMeeting(meeting?.id)}>
                    Delete Meeting
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Meetings;
