import { getDaysInMonth, setDate } from "date-fns";

export function useCalendarDays(date: Date): (Date | undefined)[] {

  const days = [...Array(getDaysInMonth(date))].map((value, index) => {
      return setDate(date, index + 1);
  });

  const startDay = setDate(date, 1).getDay();
  const fills = new Array(startDay > 0 ? startDay : 7).fill(undefined);

  return [...fills, ...days];
}

export function useCalendarMonths(year: number) {
  return [...Array(12)].map((value, index) => new Date(Date.UTC(year, index, 1)))
}
