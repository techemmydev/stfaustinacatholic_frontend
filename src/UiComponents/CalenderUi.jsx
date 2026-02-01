import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CalenderUi = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  // Convert stored string back to Date object for UI
  const parsedDate = selectedDate ? new Date(selectedDate) : null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {parsedDate ? format(parsedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DatePicker
          selected={parsedDate}
          onChange={(date) => dispatch(setSelectedDate(date.toISOString()))} // ✅ Store as ISO string
          inline
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalenderUi;
