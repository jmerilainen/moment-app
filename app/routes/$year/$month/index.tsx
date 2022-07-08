import { useParams } from "@remix-run/react";
import Calendar from "~/components/Calendar";

export default function MonthIndex() {
    const { year, month } = useParams();

    const yearValue = parseInt(year ?? '');
    const monthValue = parseInt(month ?? '');

    if (monthValue < 1 || monthValue > 12) {
        throw new Error("Month is invalid");
    }

    const date = new Date(yearValue, monthValue - 1);

    return (
      <div>
        <div className="md:aspect-video">
          <Calendar date={date} />
        </div>
      </div>
    )

}

export function ErrorBoundary({ error }: { error: Error }) {
    console.error(error);
    return (
      <div>{`Invalid date.`}</div>
    );
  }
