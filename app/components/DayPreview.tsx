export default function DayPreview({ day, current = false } : { day: number, current?: boolean }) {
  return (
    <div className="relative p-2 overflow-hidden font-sans text-right ">
      {current ? <div className="absolute top-0 right-0 w-3 h-3 rotate-45 translate-x-1/2 -translate-y-1/2 bg-current"></div> : ''}
      {day}
    </div>
  )
}
