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
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

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
    if (editingEvent) {
      setEvents((currentEvents) =>
        (currentEvents || []).map((e) =>
          e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e
        )
      );
      toast.success("Event updated successfully!");
      setEditingEvent(null);
    } else {
      const newEvent: Event = {
        ...eventData,
        id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      
      setEvents((currentEvents) => [...(currentEvents || []), newEvent]);
      toast.success("Event added successfully!");
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsAddModalOpen(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((currentEvents) => (currentEvents || []).filter((e) => e.id !== eventId));
    toast.success("Event deleted successfully!");
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevMonth}
              className="rounded-full h-10 w-10"
            >
              <CaretLeft size={20} weight="bold" />
            </Button>
            
            <h1 className="text-3xl font-semibold">
              {getMonthName(month)} {year}
            </h1>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextMonth}
              className="rounded-full h-10 w-10"
            >
              <CaretRight size={20} weight="bold" />
            </Button>
          </div>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg px-6 py-3 h-auto text-base transition-all duration-150 hover:-translate-y-0.5"
          >
            <Plus size={20} weight="bold" className="mr-2" />
            Add Event
          </Button>
        </div>

        <div className="mb-7">
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
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <AddEventModal
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddEvent={handleAddEvent}
        editEvent={editingEvent}
      />
    </div>
  );
}

export default App;