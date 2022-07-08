import { useParams } from "@remix-run/react";
import Calendar from "~/components/Calendar";

export default function YearIndex() {
    const { year, month, date } = useParams();

    const yearValue = parseInt(year ?? '');
    const monthValue = parseInt(month ?? '');
    const dateValue = parseInt(date ?? '');

    if (monthValue < 1 || monthValue > 12) {
        throw new Error("Month is invalid");
    }

    const dateObj = new Date(Date.UTC(yearValue, monthValue - 1, dateValue));

    return <Calendar date={dateObj} current={dateObj} />
}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
      <div>{`Invalid date.`}</div>
    );
}
