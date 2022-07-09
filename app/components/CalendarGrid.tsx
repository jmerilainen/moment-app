import type { ReactNode } from "react";
import { format } from "date-fns";
import { useCalendarDays } from "~/useCalendar";

export default function CalendarGrid({ date, day, collapse = true } : { date: Date, day: (date: Date) => ReactNode, collapse?: boolean }) {
  const calendar = useCalendarDays(date);

  return (
    <div className={`grid h-full gap-[2px] ${collapse ? 'md:grid-cols-7 md:grid-rows-6' : 'grid-cols-7 grid-rows-6'}`}>
      {calendar.map((date, index) => {
        if (!date) {
          return (
            <div
              className="bg-[#f5f2f0] dark:bg-slate-800 dark:text-slate-500"
              key={index}
            ></div>
          );
        }

        return (
          <div
            className="grid text-xs bg-white dark:bg-slate-800 dark:text-slate-500"
            key={format(date, 'ymd')}
          >
            {day(date)}
          </div>
        )
      })}
    </div>
  );
}
