import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { getSolutionColor } from "@/lib/types";
import { MapPin, CalendarBlank, Link as LinkIcon, PencilSimple, Trash, X } from "@phosphor-icons/react";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export const EventDetailModal = ({ event, open, onClose, onEdit, onDelete }: EventDetailModalProps) => {
  if (!event) return null;
  
  const solutionColor = getSolutionColor(event.solution);
  
  const formatDateRange = () => {
    const effectiveEndDate = event.endDate || event.startDate;
    if (event.startDate === effectiveEndDate) {
      return new Date(event.startDate + 'T00:00:00+09:00').toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul'
      });
    }
    const start = new Date(event.startDate + 'T00:00:00+09:00').toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Seoul'
    });
    const end = new Date(effectiveEndDate + 'T00:00:00+09:00').toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'Asia/Seoul'
    });
    return `${start} ~ ${end}`;
  };
  
  const handleEdit = () => {
    if (onEdit && event) {
      onEdit(event);
      onClose();
    }
  };
  
  const handleDelete = () => {
    if (onDelete && event) {
      onDelete(event.id);
      onClose();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[540px]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 text-foreground"
        >
          <X size={20} weight="regular" />
          <span className="sr-only">Close</span>
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold pr-20">{event.title}</DialogTitle>
          {onEdit && (
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="absolute right-14 top-4 h-9"
            >
              <PencilSimple size={16} weight="bold" className="mr-1.5" />
              Edit
            </Button>
          )}
        </DialogHeader>
        
        <div className="space-y-5 pt-2">
          <div>
            <div
              className="inline-block px-3.5 py-1.5 rounded-full text-base font-medium text-white"
              style={{ backgroundColor: solutionColor }}
            >
              {event.solution}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CalendarBlank size={22} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-base font-medium text-muted-foreground mb-1">Date</div>
              <div className="text-lg">{formatDateRange()}</div>
              {event.time && <div className="text-base text-muted-foreground mt-1">{event.time}</div>}
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin size={22} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-base font-medium text-muted-foreground mb-1">Location</div>
              <div className="text-lg">{event.location}</div>
            </div>
          </div>
          
          {event.registrationUrl && (
            <div className="flex items-start gap-3">
              <LinkIcon size={22} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-base font-medium text-muted-foreground mb-1">Registration Page</div>
                <a
                  href={event.registrationUrl.startsWith('http') ? event.registrationUrl : `https://${event.registrationUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-ring hover:underline break-all"
                >
                  {event.registrationUrl}
                </a>
              </div>
            </div>
          )}
          
          {event.vivaEngageUrl && (
            <div className="flex items-start gap-3">
              <LinkIcon size={22} weight="fill" className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-base font-medium text-muted-foreground mb-1">Viva Engage</div>
                <a
                  href={event.vivaEngageUrl.startsWith('http') ? event.vivaEngageUrl : `https://${event.vivaEngageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-ring hover:underline break-all"
                >
                  {event.vivaEngageUrl}
                </a>
              </div>
            </div>
          )}
        </div>
        
        {onDelete && (
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="gap-2"
            >
              <Trash size={18} weight="bold" />
              Delete Event
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
