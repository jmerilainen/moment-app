import { addMonths, format } from "date-fns";
import { Link } from "react-router-dom";
import { Outlet, useNavigate, useParams } from "@remix-run/react";

export default function MonthRoute() {
    const { year, month } = useParams();
    const navigate = useNavigate();

    const yearValue = parseInt(year ?? '');
    const monthValue = parseInt(month ?? '') - 1;

    const date = new Date(Date.UTC(yearValue, monthValue, 1));

    const nextMonth = addMonths(date, 1);
    const previousMonth = addMonths(date, -1);

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        navigate(`/${format(nextMonth, 'yyyy/MM')}`, { replace: true });
      }

      if (event.key === 'ArrowLeft') {
        navigate(`/${format(previousMonth, 'yyyy/MM')}`, { replace: true });
      }
    };

    // useEffect(() => {
    //     document.addEventListener('keyup', onKeydown);

    //     return () => document.removeEventListener('keyup', onKeydown);
    // }, [month]);



    return (
        <div className="grid gap-16">
            <div className="text-4xl font-bold">
              <Link to={`/${format(date, 'yyyy')}`}>
                {format(date, 'MMMM')}
              </Link>
            </div>
            <Outlet />
        </div>
    )


}
