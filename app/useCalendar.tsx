import { getDaysInMonth, setDate } from "date-fns";

function groupArr(data: number[], n: number) {
    var group: any = [];
    for (var i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0)
            j++;
        group[j] = group[j] || [];
        group[j].push(data[i])
    }
    return group;
}


export default function useCalendar(date: Date) {

    const se = new Array(getDaysInMonth(date)).fill(null).map((value, index) => {
        return setDate(date, index + 1);
    });

    const start = setDate(date, 1).getDay() - 1;
    const jee = new Array(start > 0 ? start : 6).fill(undefined);
    const all = [...jee, ...se];

    const calendar: (Date | undefined)[][] = groupArr(all, 7);

    return calendar;
}
