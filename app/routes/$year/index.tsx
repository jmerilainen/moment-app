import { format, isToday } from "date-fns";
import { Link, useParams } from "@remix-run/react";
import CalendarGrid from "~/components/CalendarGrid";
import DayPreview from "~/components/DayPreview";
import { useCalendarMonths } from "~/useCalendar";

export default function YearIndex() {
    const { year } = useParams();

    const months = useCalendarMonths(parseInt(year ?? '1970'));

    return (
        <div className="grid gap-8 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {months.map((date) => (
                <div className="relative grid gap-4 group" key={format(date, 'yyyy/MM')}>
                    <Link className="stretched" to={`/${format(date, 'yyyy/MM')}`}>
                        {format(date, 'MMMM')}
                    </Link>
                    <div className="transition ease-in-out aspect-video group-hover:opacity-75">
                        <CalendarGrid
                          date={date}
                          day={(day) => <DayPreview day={Number(format(day, 'd'))} current={isToday(day)} />}
                          key="index"
                          collapse={false}
                        />

                    </div>
                </div>
            ))}
        </div>
    )

}
