import { useEffect, useReducer } from "react"

export interface Todo {
    id: string;
    value: string;
    date: string;
    done: boolean;
}


export type Action =
    | { type: 'ADD', payload: Todo }
    | { type: 'DELETE', id: string }
    | { type: 'DONE', id: string }
    | { type: 'EDIT', id: string, value: string }
;

const initialState: Todo[] = [];

function reducer(state: Todo[], action: Action) {
    switch (action.type) {
        case 'DONE':
            return [
                ...state.map(item =>
                    item.id === action.id
                        ? { ...item, done: ! item.done }
                        : item
                )
            ];
        case 'EDIT':
            return [
                ...state.map(item =>
                    item.id === action.id
                        ? { ...item, value: action.value }
                        : item
                )
            ];
        case 'DELETE':
            return [
                ...state.filter(item => item.id !== action.id)
            ];
        case 'ADD':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
}

export const initializer = (initialValue = initialState) => typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("moment-todos") ?? '[]') || initialValue
    : initialValue;

export default function useTodos() {
    const KEY = 'moment-todos';

    const [state, dispatch] = useReducer(reducer, initialState, initializer);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(state));
    }, [state]);

    return [state, dispatch] as const;
}
