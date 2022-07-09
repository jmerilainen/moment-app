import { addMonths, format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "@remix-run/react";
import Calendar from "~/components/Calendar";
import useTodos from "~/useTodos";
import App from "~/components/App";
import { useEffect } from "react";

export default function MonthRoute() {
    const { year, month } = useParams();
    const navigate = useNavigate();

    const yearValue = parseInt(year ?? '');
    const monthValue = parseInt(month ?? '') - 1;

    const date = new Date(Date.UTC(yearValue, monthValue, 1));

    const nextMonth = addMonths(date, 1);
    const previousMonth = addMonths(date, -1);

    const [todos, dispatch] =  useTodos();

    const onKeydown = (event: KeyboardEvent) => {
      if (event.target != document.querySelector('body')) {
        return;
      }

      if (event.key === 'ArrowRight') {
        navigate(`/${format(nextMonth, 'yyyy/MM')}`, { replace: true });
      }

      if (event.key === 'ArrowLeft') {
        navigate(`/${format(previousMonth, 'yyyy/MM')}`, { replace: true });
      }
    };

    useEffect(() => {
        document.addEventListener('keyup', onKeydown);

        return () => document.removeEventListener('keyup', onKeydown);
    }, [month]);

    return (
      <App>
        <div className="grid gap-8 lg:gap-16 relative z-[1]">
          <div className="text-4xl font-bold">
            <Link to={`/${format(date, 'yyyy')}`}>
              {format(date, 'MMMM')}
            </Link>
          </div>
          <div className="md:aspect-video">
            <Calendar
              date={date}
              todos={todos}
              onCreate={(date, value) => dispatch({ type: 'ADD', date, value })}
              onEdit={(id, value) => dispatch({ type: 'EDIT', id, value })}
              onToggleDone={(id) => dispatch({ type: 'DONE', id })}
              onDelete={(id) => dispatch({ type: 'DELETE', id })}
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-between">
          <Link className="w-16 h-full" to={`/${format(previousMonth, 'yyyy/MM')}`}>
            <span className="sr-only">Previous month: {format(previousMonth, 'MMMM')}</span>
          </Link>
          <Link className="w-16 h-full " to={`/${format(nextMonth, 'yyyy/MM')}`}>
            <span className="sr-only">Next month: {format(nextMonth, 'MMMM')}</span>
          </Link>
        </div>
      </App>
    )
}
