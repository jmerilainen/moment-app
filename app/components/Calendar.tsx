import { format, isSameDay } from "date-fns";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "@remix-run/react";
import useCalendar from "~/useCalendar"
import useTodos, { Action, Todo } from "~/useTodos";
import CalendarGrid from "./CalendarGrid";

interface CalendarProps {
    date?: Date;
    current?: Date;
}

interface DayProps {
    date: Date;
    items: Todo[];
    children?: ReactNode;
    dispatch: (acton: Action) => void;
}

function DayTask({
    value,
    done,
    onDone,
    onDelete,
    onChange,
 }: {
     value: string;
     done: boolean;
     onDone: () => void;
     onDelete: () => void;
     onChange: (value: string) => void;
 }) {

    const [contentEditableValue] = useState(value);
    const ref = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (ref.current && value === '') {
            ref.current.focus()
        }
    }, [])

    return (
        <div className="flex gap-[0.5em] group relative">
            <button onClick={() => onDone()}>
                <span className={`${done ? 'bg-current' : 'hover:bg-white/10'} flex w-[0.75em] h-[0.75em] border border-current rounded-full  transition`}></span>
            </button>
            <div
                ref={ref}
                contentEditable
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.currentTarget.blur();
                        return;
                    }
                    if (event.metaKey && event.key === "Enter") {
                        // TODO: create a new task, don't blur
                        onDone()
                        event.currentTarget.blur();
                        return;
                    }
                }}
                onBlur={(event) => {
                    let newValue = event.currentTarget.innerText.trim();
                    if (! newValue) {
                        onDelete();
                        return;
                    }
                    if (newValue !== value) {
                      onChange(newValue);
                      return;
                    }
                }}
                dangerouslySetInnerHTML={{ __html: contentEditableValue }}
            />
            <div className="absolute right-0">
                <button className="transition opacity-0 group-hover:opacity-60" onClick={() => onDelete()}>
                    x
                </button>
            </div>
        </div>
    )
}

function Day({
    date,
    items,
    children,
    dispatch,
}: DayProps
) {
    const slug = format(date, 'yyyy/MM/dd');
    const key = format(date, 'yyyy-MM-dd');

    const onDelete = (id: string) => dispatch({ type: 'DELETE', id });
    const onDone = (id: string) =>  dispatch({ type: 'DONE', id });
    const onChange = (id: string, value: string) =>  dispatch({ type: 'EDIT', id, value });
    const onAdd = () => dispatch({ type: 'ADD', payload: {
        'id': 'id' + new Date,
        'done': false,
        'date': key,
        value: '',
    } });

    return (
        <div
            className="relative p-4 font-sans text-xs "
            tabIndex={0}
            onKeyDown={(event) => {
                if (event.key === "Enter") {

                    event.preventDefault()
                    onAdd()
                }
            }}
        >
            <div className="grid gap-4">
                <div>
                    {format(date, 'd')}
                </div>
                {children
                    ? children
                    : <div className="uppercase track">
                        <ol className="relative z-10">
                            {items.map((item, index) => (
                                <li key={item.id}>
                                    <DayTask
                                        value={item.value}
                                        done={item.done}
                                        onDone={() => onDone(item.id)}
                                        onDelete={() => onDelete(item.id)}
                                        onChange={(value: string) => onChange(item.id, value)}
                                    />
                                </li>
                            ))}
                        </ol>
                        <div className="transition opacity-0 hover:opacity-70">
                            <button className="absolute inset-0 flex pl-4" onClick={() => onAdd()}>
                                <span className="sr-only">Add</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default function Calendar({ date = new Date(), current = undefined }: CalendarProps) {
    const [data, dispatch] = useTodos();

    const d = (date: Date) => {
      const key = format(date, 'yyyy-MM-dd');
      const items = data.filter(item => item.date === key);
      return (
        <Day date={date} items={items} dispatch={dispatch}>
              {date && current && isSameDay(date, current) ? <Outlet context={{date: date}} /> : ''}
        </Day>
      )
    }

    return (
      <CalendarGrid
        date={date}
        day={(day) => d(day)}
        key="index"
      />
  )
}
