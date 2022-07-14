import { format } from "date-fns";
import { nanoid } from "nanoid";
import { useEffect, useReducer } from "react";

export interface Todo {
  id: string;
  value: string;
  dateId: string;
  done: boolean;
}

export type Action =
  | { type: "ADD"; value: string; date: Date }
  | { type: "DELETE"; id: string }
  | { type: "DONE"; id: string }
  | { type: "EDIT"; id: string; value: string };

export function dateId(date: Date) {
  return format(date, "yyyy-MM-dd");
}

const initialState: Todo[] = [];

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case "DONE":
      return [
        ...state.map((item) =>
          item.id === action.id ? { ...item, done: !item.done } : item
        ),
      ];
    case "EDIT":
      return [
        ...state.map((item) =>
          item.id === action.id ? { ...item, value: action.value } : item
        ),
      ];
    case "DELETE":
      return [...state.filter((item) => item.id !== action.id)];
    case "ADD":
      return [
        ...state,
        {
          id: nanoid(),
          value: action.value,
          dateId: dateId(action.date),
          done: false,
        },
      ];
    default:
      return state;
  }
}

export const initializer = (initialValue = initialState) =>
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("moment-todos") ?? "[]") || initialValue
    : initialValue;

export default function useTodos() {
  const KEY = "moment-todos";

  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  return [state, dispatch] as const;
}
