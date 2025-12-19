import { MapPin, ArrowRight, ArrowLeft } from "@phosphor-icons/react";
import { Event } from "@/lib/types";
import { getSolutionColor } from "@/lib/types";
import { getEventPosition } from "@/lib/calendar";

interface EventCardProps {
  event: Event;
  dateString: string;
  onClick: () => void;
}

export const EventCard = ({ event, dateString, onClick }: EventCardProps) => {
  const position = getEventPosition(dateString, event.startDate, event.endDate);
  const solutionColor = getSolutionColor(event.solution);
  
  if (position === 'middle' || position === 'end') {
    return (
      <div
        onClick={onClick}
        className="h-5 rounded flex items-center justify-between px-2 cursor-pointer transition-all duration-150 hover:opacity-80"
        style={{ backgroundColor: solutionColor }}
      >
        <ArrowLeft size={12} weight="bold" className="text-white flex-shrink-0" />
        {position === 'middle' && (
          <ArrowRight size={12} weight="bold" className="text-white flex-shrink-0" />
        )}
      </div>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg p-3 cursor-pointer transition-all duration-150 hover:shadow-md border-l-4 flex flex-col gap-1.5"
      style={{ borderLeftColor: solutionColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium leading-snug line-clamp-2 flex-1">
          {event.title}
        </h3>
        {position === 'start' && event.startDate !== event.endDate && (
          <ArrowRight size={14} weight="bold" className="flex-shrink-0 mt-0.5" style={{ color: solutionColor }} />
        )}
      </div>
      
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin size={12} weight="fill" />
        <span className="truncate">{event.location}</span>
      </div>
      
      {event.time && (
        <div className="text-xs text-muted-foreground">
          {event.time}
        </div>
      )}
    </div>
  );
};
