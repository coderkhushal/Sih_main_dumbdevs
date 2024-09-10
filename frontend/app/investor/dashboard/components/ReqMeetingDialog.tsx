import { CreateMeating } from "@/actions/investor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ReqMeeting({ startupID }: { startupID: number }) {
    
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(60);
  const sendMeetingRequest = async ({
    startupId,
    duration,
    date,
  }: {
    startupId: number;
    duration: number;
    date: string;
  }) => {
    
    const req = await CreateMeating({ startupId, duration, date });
    alert(`message: ${req?.msg}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Request Meeting</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Shedule Meeting</DialogTitle>
          <DialogDescription>
            Schedule Your Meeting here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Date-Time
            </Label>
            <Input
              id="date"
              placeholder="date"
              type="datetime-local"
              className="col-span-3"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Duration(mins)
            </Label>
            <Input
              id="duration"
              className="col-span-3"
              value={duration}
              type="number"
              onChange={(event) => setDuration(parseInt(event.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => sendMeetingRequest({ startupId:startupID, duration, date })}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
