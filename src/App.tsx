import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Event, Solution, SOLUTIONS } from "@/lib/types";
import { getCalendarGrid, getMonthName } from "@/lib/calendar";
import { CalendarGrid } from "@/components/CalendarGrid";
import { SolutionFilter } from "@/components/SolutionFilter";
import { EventDetailModal } from "@/components/EventDetailModal";
import { AddEventModal } from "@/components/AddEventModal";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight, Plus } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";

function App() {
  const [events, setEvents] = useKV<Event[]>("marketing-events", []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState<Set<Solution>>(new Set(SOLUTIONS));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const weeks = getCalendarGrid(year, month);

  const handleToggleFilter = (solution: Solution) => {
    setActiveFilters((prev) => {
      const newFilters = new Set(prev);
      if (newFilters.has(solution)) {
        newFilters.delete(solution);
      } else {
        newFilters.add(solution);
      }
      return newFilters;
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };

  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    
    setEvents((currentEvents) => [...(currentEvents || []), newEvent]);
    toast.success("Event added successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="rounded-full h-9 w-9"
            >
              <CaretLeft size={18} weight="bold" />
            </Button>
            
            <h1 className="text-2xl font-semibold">
              {getMonthName(month)} {year}
            </h1>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="rounded-full h-9 w-9"
            >
              <CaretRight size={18} weight="bold" />
            </Button>
          </div>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg px-5 py-2.5 h-auto transition-all duration-150 hover:-translate-y-0.5"
          >
            <Plus size={18} weight="bold" className="mr-1.5" />
            Add Event
          </Button>
        </div>

        <div className="mb-6">
          <SolutionFilter
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
          />
        </div>

        <CalendarGrid
          weeks={weeks}
          events={events || []}
          activeFilters={activeFilters}
          onEventClick={handleEventClick}
        />
      </div>

      <EventDetailModal
        event={selectedEvent}
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedEvent(null);
        }}
      />

      <AddEventModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}

export default App;