import { useState } from "react";
import { useKV } from "@github/spark/hooks";
import { Event, Solution, SOLUTIONS, Highlight, OnDemand, QuickLink } from "@/lib/types";
import { getCalendarGrid, getMonthName } from "@/lib/calendar";
import { CalendarGrid } from "@/components/CalendarGrid";
import { SolutionFilter } from "@/components/SolutionFilter";
import { EventDetailModal } from "@/components/EventDetailModal";
import { AddEventModal } from "@/components/AddEventModal";
import { SidebarContent } from "@/components/SidebarContent";
import { AddHighlightModal } from "@/components/AddHighlightModal";
import { AddOnDemandModal } from "@/components/AddOnDemandModal";
import { AddQuickLinkModal } from "@/components/AddQuickLinkModal";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight, Plus, Download } from "@phosphor-icons/react";
import { Toaster, toast } from "sonner";

function App() {
  const [events, setEvents] = useKV<Event[]>("marketing-events", []);
  const [highlights, setHighlights] = useKV<Highlight[]>("sidebar-highlights", []);
  const [onDemands, setOnDemands] = useKV<OnDemand[]>("sidebar-ondemands", []);
  const [quickLinks, setQuickLinks] = useKV<QuickLink[]>("sidebar-quicklinks", []);
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilters, setActiveFilters] = useState<Set<Solution>>(new Set(SOLUTIONS));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  const [isAddHighlightModalOpen, setIsAddHighlightModalOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [isAddOnDemandModalOpen, setIsAddOnDemandModalOpen] = useState(false);
  const [editingOnDemand, setEditingOnDemand] = useState<OnDemand | null>(null);
  const [isAddQuickLinkModalOpen, setIsAddQuickLinkModalOpen] = useState(false);
  const [editingQuickLink, setEditingQuickLink] = useState<QuickLink | null>(null);

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

  const handleAddHighlight = (highlightData: Omit<Highlight, 'id'>) => {
    if (editingHighlight) {
      setHighlights((current) =>
        (current || []).map((h) =>
          h.id === editingHighlight.id ? { ...highlightData, id: editingHighlight.id } : h
        )
      );
      toast.success("Highlight updated successfully!");
      setEditingHighlight(null);
    } else {
      const newHighlight: Highlight = {
        ...highlightData,
        id: `highlight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setHighlights((current) => [...(current || []), newHighlight]);
      toast.success("Highlight added successfully!");
    }
  };

  const handleEditHighlight = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    setIsAddHighlightModalOpen(true);
  };

  const handleDeleteHighlight = (id: string) => {
    setHighlights((current) => (current || []).filter((h) => h.id !== id));
    toast.success("Highlight deleted successfully!");
  };

  const handleCloseHighlightModal = () => {
    setIsAddHighlightModalOpen(false);
    setEditingHighlight(null);
  };

  const handleAddOnDemand = (onDemandData: Omit<OnDemand, 'id'>) => {
    if (editingOnDemand) {
      setOnDemands((current) =>
        (current || []).map((od) =>
          od.id === editingOnDemand.id ? { ...onDemandData, id: editingOnDemand.id } : od
        )
      );
      toast.success("On-demand updated successfully!");
      setEditingOnDemand(null);
    } else {
      const newOnDemand: OnDemand = {
        ...onDemandData,
        id: `ondemand-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setOnDemands((current) => [...(current || []), newOnDemand]);
      toast.success("On-demand added successfully!");
    }
  };

  const handleEditOnDemand = (onDemand: OnDemand) => {
    setEditingOnDemand(onDemand);
    setIsAddOnDemandModalOpen(true);
  };

  const handleDeleteOnDemand = (id: string) => {
    setOnDemands((current) => (current || []).filter((od) => od.id !== id));
    toast.success("On-demand deleted successfully!");
  };

  const handleCloseOnDemandModal = () => {
    setIsAddOnDemandModalOpen(false);
    setEditingOnDemand(null);
  };

  const handleAddQuickLink = (quickLinkData: Omit<QuickLink, 'id'>) => {
    if (editingQuickLink) {
      setQuickLinks((current) =>
        (current || []).map((ql) =>
          ql.id === editingQuickLink.id ? { ...quickLinkData, id: editingQuickLink.id } : ql
        )
      );
      toast.success("Quick link updated successfully!");
      setEditingQuickLink(null);
    } else {
      const newQuickLink: QuickLink = {
        ...quickLinkData,
        id: `quicklink-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setQuickLinks((current) => [...(current || []), newQuickLink]);
      toast.success("Quick link added successfully!");
    }
  };

  const handleEditQuickLink = (quickLink: QuickLink) => {
    setEditingQuickLink(quickLink);
    setIsAddQuickLinkModalOpen(true);
  };

  const handleDeleteQuickLink = (id: string) => {
    setQuickLinks((current) => (current || []).filter((ql) => ql.id !== id));
    toast.success("Quick link deleted successfully!");
  };

  const handleCloseQuickLinkModal = () => {
    setIsAddQuickLinkModalOpen(false);
    setEditingQuickLink(null);
  };

  const handleExportJSON = () => {
    const eventsToExport = (events || []).map(({ id, ...rest }) => rest);
    const highlightsToExport = (highlights || []).map(({ id, ...rest }) => rest);
    const onDemandsToExport = (onDemands || []).map(({ id, ...rest }) => rest);
    const quickLinksToExport = (quickLinks || []).map(({ id, ...rest }) => rest);
    
    const exportData = {
      events: eventsToExport,
      highlights: highlightsToExport,
      onDemand: onDemandsToExport,
      quickLinks: quickLinksToExport,
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "marketing-calendar-data.json";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    const totalItems = eventsToExport.length + highlightsToExport.length + onDemandsToExport.length + quickLinksToExport.length;
    toast.success(`Exported ${totalItems} item(s) successfully!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      
      <div className="max-w-[2400px] mx-auto p-6">
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
            
            <h1 className="text-2xl font-semibold">
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

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExportJSON}
              variant="outline"
              className="font-semibold rounded-lg px-4 py-2.5 h-auto text-sm transition-all duration-150 hover:-translate-y-0.5"
            >
              <Download size={18} weight="bold" className="mr-2" />
              Export JSON
            </Button>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg px-5 py-2.5 h-auto text-sm transition-all duration-150 hover:-translate-y-0.5"
            >
              <Plus size={18} weight="bold" className="mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 xl:w-[65%]">
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

          <div className="xl:w-[35%]">
            <SidebarContent
              highlights={highlights || []}
              onDemands={onDemands || []}
              quickLinks={quickLinks || []}
              onAddHighlight={() => setIsAddHighlightModalOpen(true)}
              onEditHighlight={handleEditHighlight}
              onDeleteHighlight={handleDeleteHighlight}
              onAddOnDemand={() => setIsAddOnDemandModalOpen(true)}
              onEditOnDemand={handleEditOnDemand}
              onDeleteOnDemand={handleDeleteOnDemand}
              onAddQuickLink={() => setIsAddQuickLinkModalOpen(true)}
              onEditQuickLink={handleEditQuickLink}
              onDeleteQuickLink={handleDeleteQuickLink}
            />
          </div>
        </div>
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

      <AddHighlightModal
        open={isAddHighlightModalOpen}
        onClose={handleCloseHighlightModal}
        onAddHighlight={handleAddHighlight}
        editHighlight={editingHighlight}
      />

      <AddOnDemandModal
        open={isAddOnDemandModalOpen}
        onClose={handleCloseOnDemandModal}
        onAddOnDemand={handleAddOnDemand}
        editOnDemand={editingOnDemand}
      />

      <AddQuickLinkModal
        open={isAddQuickLinkModalOpen}
        onClose={handleCloseQuickLinkModal}
        onAddQuickLink={handleAddQuickLink}
        editQuickLink={editingQuickLink}
      />
    </div>
  );
}

export default App;