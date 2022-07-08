import { format } from "date-fns";
import { useRef } from "react";
import { Form, useOutletContext } from "@remix-run/react";

export function action() {
    return null;
}

export default function DayEdit() {
    const data = useOutletContext<{date: Date}>();

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Form replace method="post">
            <div className="space-y-2">
                <input type="text" name="hsdfj" />
                <input ref={inputRef} type="text" name="placeholder" />
                <input type="hidden" name="date" value={format(data.date, 'yyyy-MM-dd')} />
            </div>
            <button>Send</button>
        </Form>
    )
}
