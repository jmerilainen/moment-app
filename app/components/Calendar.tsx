import { format, isSameDay } from "date-fns";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, Outlet, useParams } from "@remix-run/react";
import useTodos, { Action, dateId, Todo } from "~/useTodos";
import CalendarGrid from "./CalendarGrid";

interface CalendarProps {
    date?: Date;
    now?: Date;
    todos: Todo[];
    onCreate: (date: Date, value: string) => void;
    onEdit: (id: string, value: string) => void;
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
}

interface DayProps {
    date: Date;
    items: Todo[];
    isToday?: boolean;
    onCreate: (date: Date, value: string) => void;
    onEdit: (id: string, value: string) => void;
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
}

function DayTask({
    value,
    done,
    onToggleDone,
    onDelete,
    onEdit,
 }: {
     value: string;
     done: boolean;
     onToggleDone: () => void;
     onDelete: () => void;
     onEdit: (value: string) => void;
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
            <button type="button" onClick={() => onToggleDone()}>
                <span className={`${done ? 'bg-current' : 'hover:bg-white/10'} flex w-[0.75em] h-[0.75em] border border-current rounded-full  transition`}></span>
                {done
                  ? <span className="sr-only">Mark item to undone</span>
                  : <span className="sr-only">Mark item to done</span>
                }
            </button>
            <div
                ref={ref}
                contentEditable
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.currentTarget.blur();
                        return;
                    }

                    if (! event.metaKey && event.key === "Enter") {
                      event.currentTarget.blur();
                      return;
                    }

                    if (event.metaKey && event.key === "Enter") {
                        // TODO: create a new task, don't blur
                        onToggleDone()
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
                      onEdit(newValue);
                      return;
                    }
                }}
                dangerouslySetInnerHTML={{ __html: contentEditableValue }}
            />
            <div className="absolute right-0">
                <button className="transition opacity-0 group-hover:opacity-60 focus:opacity-60" onClick={() => onDelete()}>
                  <span aria-hidden="true">x</span><span className="sr-only">Delete item</span>
                </button>
            </div>
        </div>
    )
}

function Day({
    date,
    items,
    isToday = false,
    onCreate,
    onEdit,
    onToggleDone,
    onDelete
}: DayProps
) {
  return (
    <div
        className="relative p-4 font-sans text-xs "
    >
      <div className="grid gap-4">
        <div className="md:text-right">
          <span className={`${isToday ? 'bg-black text-white w-[1.5em] h-[1.5em] inline-flex items-center justify-center rounded-full' : ''}`}>
            {format(date, 'd')}
          </span>
        </div>

        {items.length
          ? <ol className="relative z-10 uppercase track">
            {items.map((item, index) => (
              <li key={item.id}>
                  <DayTask
                      value={item.value}
                      done={item.done}
                      onToggleDone={() => onToggleDone(item.id)}
                      onDelete={() => onDelete(item.id)}
                      onEdit={(value: string) => {
                        onEdit(item.id, value)
                        onCreate(date,  '')
                      }}
                  />
              </li>
            ))}
          </ol>
          : ''
        }
        <button type="button" className="absolute inset-0 group focus-within:z-[20]" onClick={() => onCreate(date, '')}>
          <span className="flex items-center justify-center w-full h-full opacity-0 bg-white/80 group-focus-within:opacity-100">
            <span className="sr-only group-focus-within:not-sr-only">Add new</span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default function Calendar({
  date = new Date(),
  now = new Date(),
  todos = [],
  onCreate,
  onEdit,
  onToggleDone,
  onDelete
}: CalendarProps) {

    const DayForDate = ({ date } : { date: Date }) => {
      const items = todos.filter(item => item.dateId === dateId(date));

      return <Day
        date={date}
        isToday={isSameDay(date, now)}
        items={items}
        onCreate={onCreate}
        onEdit={onEdit}
        onToggleDone={onToggleDone}
        onDelete={onDelete}
      />
    }

    return (
      <CalendarGrid
        date={date}
        day={(day) => <DayForDate date={day} />}
      />
  )
}
