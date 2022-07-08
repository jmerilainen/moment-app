import { format } from "date-fns";
import { Link, useParams } from "@remix-run/react";
import Calendar from "~/components/Calendar";

export default function YearIndex() {
    const { year } = useParams();

    const months = [...Array(12)].map((value, index) => new Date(Date.UTC(parseInt(year ?? '1970'), index, 1)));

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
            {months.map((date, index) => (
                <div className="relative" key={format(date, 'yyyy/MM')}>
                    <div>
                    <Link className="absolute inset-0" to={`/${format(date, 'yyyy/MM')}`}>
                        {format(date, 'MMMM')}
                    </Link>
                    </div>
                    <div>
                    <div className="aspect-video">
                        <Calendar date={date} key={index} />
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )

}
