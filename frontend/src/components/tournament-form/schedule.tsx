"use client";
import { DatePicker } from "../ui/date-picker";
import {
  setEndDate,
  setStartDate,
} from "../../state-manager/features/tournament-form";
import { RootState } from "../../state-manager/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Schedule = () => {
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.tournamentForm
  );
  const dispatch = useDispatch();
  const [localStartDate, setLocalStartDate] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [localEndDate, setLocalEndDate] = useState(
    endDate ? new Date(endDate) : undefined
  );

  useEffect(() => {
    if (localStartDate) dispatch(setStartDate(localStartDate.toISOString()));
    if (localEndDate) dispatch(setEndDate(localEndDate.toISOString()));
  }, [localStartDate, localEndDate]);

  useEffect(() => {
    if (startDate) setLocalStartDate(new Date(startDate));
    if (endDate) setLocalEndDate(new Date(endDate));
  }, [startDate, endDate]);

  return (
    <div className="h-fit gap-2 w-fit rounded-lg bg-active flex flex-col overflow-hidden py-2 px-3">
      <div className="w-full h-full flex gap-4 items-center justify-between">
        <p>Start</p>
        <DatePicker setDate={setLocalStartDate} date={localStartDate} />
      </div>
      <div className="w-full h-full flex gap-4 items-center justify-between">
        <p>End</p>
        <DatePicker setDate={setLocalEndDate} date={localEndDate} />
      </div>
    </div>
  );
};

export default Schedule;
