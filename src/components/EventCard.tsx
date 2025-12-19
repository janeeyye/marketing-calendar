import { MapPin, ArrowRight, ArrowLeft, Link as LinkIcon } from "@phosphor-icons/react";
import { Event } from "@/lib/types";
import { getSolutionColor } from "@/lib/types";
import { getEventPosition } from "@/lib/calendar";

interface EventCardProps {
  event: Event;
  dateString: string;
  onClick: () => void;
}

export const EventCard = ({ event, dateString, onClick }: EventCardProps) => {
  const effectiveEndDate = event.endDate || event.startDate;
  const position = getEventPosition(dateString, event.startDate, effectiveEndDate);
  const solutionColor = getSolutionColor(event.solution);
  
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank', 'noopener,noreferrer');
  };
  
  if (position === 'middle' || position === 'end') {
    return (
      <div
        onClick={onClick}
        className="h-6 rounded flex items-center gap-2 px-2 cursor-pointer transition-all duration-150 hover:opacity-90 border-l-4"
        style={{ 
          borderLeftColor: solutionColor,
          backgroundColor: 'oklch(0.98 0.005 75)'
        }}
      >
        <ArrowRight size={14} weight="bold" className="flex-shrink-0" style={{ color: solutionColor }} />
        <span className="text-sm truncate flex-1 italic" style={{ color: solutionColor }}>
          {event.title}
        </span>
        {event.time && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            계속됨
          </span>
        )}
      </div>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg p-3.5 cursor-pointer transition-all duration-150 hover:shadow-md border-l-4 flex flex-col gap-2"
      style={{ borderLeftColor: solutionColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base font-medium leading-tight line-clamp-3 flex-1">
          {event.title}
        </h3>
        {position === 'start' && event.startDate !== effectiveEndDate && (
          <ArrowRight size={16} weight="bold" className="flex-shrink-0 mt-0.5" style={{ color: solutionColor }} />
        )}
      </div>
      
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin size={14} weight="fill" />
        <span className="truncate">{event.location}</span>
      </div>
      
      {event.time && (
        <div className="text-sm text-muted-foreground">
          {event.time}
        </div>
      )}
      
      {(event.registrationUrl || event.vivaEngageUrl) && (
        <div className="flex items-center gap-2 mt-0.5">
          {event.registrationUrl && (
            <button
              onClick={(e) => handleLinkClick(e, event.registrationUrl!)}
              className="flex items-center gap-1 text-sm font-medium text-ring hover:underline transition-colors"
            >
              <LinkIcon size={14} weight="bold" />
              <span>Reg</span>
            </button>
          )}
          {event.vivaEngageUrl && (
            <button
              onClick={(e) => handleLinkClick(e, event.vivaEngageUrl!)}
              className="flex items-center gap-1 text-sm font-medium text-ring hover:underline transition-colors"
            >
              <LinkIcon size={14} weight="bold" />
              <span>Viva</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
