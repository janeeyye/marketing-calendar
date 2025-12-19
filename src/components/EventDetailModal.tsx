import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Event } from "@/lib/types";
import { getSolutionColor } from "@/lib/types";
import { MapPin, CalendarBlank, Link as LinkIcon } from "@phosphor-icons/react";
import { X } from "@phosphor-icons/react";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export const EventDetailModal = ({ event, open, onClose }: EventDetailModalProps) => {
  if (!event) return null;
  
  const solutionColor = getSolutionColor(event.solution);
  
  const formatDateRange = () => {
    if (event.startDate === event.endDate) {
      return new Date(event.startDate + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    const start = new Date(event.startDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const end = new Date(event.endDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    return `${start} ~ ${end}`;
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X size={20} />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold pr-8">{event.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: solutionColor }}
            >
              {event.solution}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CalendarBlank size={20} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Date</div>
              <div className="text-base">{formatDateRange()}</div>
              {event.time && <div className="text-sm text-muted-foreground mt-0.5">{event.time}</div>}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin size={20} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Location</div>
              <div className="text-base">{event.location}</div>
            </div>
          </div>
          
          {event.registrationUrl && (
            <div className="flex items-start gap-3">
              <LinkIcon size={20} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Registration Page</div>
                <a
                  href={event.registrationUrl.startsWith('http') ? event.registrationUrl : `https://${event.registrationUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ring hover:underline break-all"
                >
                  {event.registrationUrl}
                </a>
              </div>
            </div>
          )}
          
          {event.vivaEngageUrl && (
            <div className="flex items-start gap-3">
              <LinkIcon size={20} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Viva Engage</div>
                <a
                  href={event.vivaEngageUrl.startsWith('http') ? event.vivaEngageUrl : `https://${event.vivaEngageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ring hover:underline break-all"
                >
                  {event.vivaEngageUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
