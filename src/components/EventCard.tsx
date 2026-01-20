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
        className="h-6 rounded flex items-center gap-2 px-2 cursor-pointer transition-all duration-150 hover:opacity-90 border-l-[5px]"
        style={{ 
          borderLeftColor: solutionColor,
          backgroundColor: 'oklch(0.98 0.005 75)'
        }}
      >
        <ArrowRight size={12} weight="bold" className="flex-shrink-0" style={{ color: solutionColor }} />
        <span className="text-[11px] truncate flex-1 italic" style={{ color: solutionColor }}>
          {event.title}
        </span>
      </div>
    );
  }
  
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-lg p-2.5 cursor-pointer transition-all duration-150 hover:shadow-md border-l-[5px] flex flex-col gap-1"
      style={{ borderLeftColor: solutionColor }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xs font-medium leading-snug line-clamp-2 flex-1">
          {event.title}
        </h3>
        {position === 'start' && event.startDate !== effectiveEndDate && (
          <ArrowRight size={12} weight="bold" className="flex-shrink-0 mt-0.5" style={{ color: solutionColor }} />
        )}
      </div>
      
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MapPin size={11} weight="fill" />
          <span className="truncate">{event.location}</span>
        </div>
        
        {(event.registrationUrl || event.vivaEngageUrl) && (
          <div className="flex items-center gap-2">
            {event.registrationUrl && (
              <button
                onClick={(e) => handleLinkClick(e, event.registrationUrl!)}
                className="text-[11px] font-medium text-ring hover:underline transition-colors"
              >
                Reg❯
              </button>
            )}
            {event.vivaEngageUrl && (
              <button
                onClick={(e) => handleLinkClick(e, event.vivaEngageUrl!)}
                className="text-[11px] font-medium text-ring hover:underline transition-colors"
              >
                Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
