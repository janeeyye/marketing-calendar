import { Event, Solution } from "@/lib/types";
import { CalendarWeek } from "@/lib/calendar";
import { isDateInRange } from "@/lib/calendar";
import { EventCard } from "./EventCard";

interface CalendarGridProps {
  weeks: CalendarWeek[];
  events: Event[];
  activeFilters: Set<Solution>;
  onEventClick: (event: Event) => void;
}

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarGrid = ({ weeks, events, activeFilters, onEventClick }: CalendarGridProps) => {
  const getEventsForDate = (dateString: string) => {
    return events.filter((event) => {
      const isInDateRange = isDateInRange(dateString, event.startDate, event.endDate);
      if (!isInDateRange) {
        return false;
      }

      const hasOtherSolutionActive = 
        activeFilters.has("AI Business Solutions") ||
        activeFilters.has("Cloud and AI Platforms") ||
        activeFilters.has("Security");

      if (event.solution === "All CSAs") {
        if (hasOtherSolutionActive) {
          return true;
        }
        return activeFilters.has("All CSAs");
      }

      return activeFilters.has(event.solution);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAY_NAMES.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-semibold text-muted-foreground bg-muted/30"
          >
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 border-b border-border last:border-b-0">
          {week.days.map((day, dayIndex) => {
            const dayEvents = getEventsForDate(day.dateString);
            
            return (
              <div
                key={dayIndex}
                className={`p-2.5 border-r border-border last:border-r-0 flex flex-col gap-1.5 min-h-[100px] ${
                  !day.isCurrentMonth ? 'bg-muted/20' : ''
                }`}
              >
                <div
                  className={`text-sm font-medium ${
                    day.isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {day.dayOfMonth}
                </div>
                
                <div className="flex flex-col gap-1.5 flex-1">
                  {dayEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      dateString={day.dateString}
                      onClick={() => onEventClick(event)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
