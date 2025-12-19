import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event, SOLUTIONS, LOCATION_OPTIONS, Solution } from "@/lib/types";
import { X } from "@phosphor-icons/react";

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  editEvent?: Event | null;
}

export const AddEventModal = ({ open, onClose, onAddEvent, editEvent }: AddEventModalProps) => {
  const [title, setTitle] = useState("");
  const [solution, setSolution] = useState<Solution | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [locationOption, setLocationOption] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [registrationUrl, setRegistrationUrl] = useState("");
  const [vivaEngageUrl, setVivaEngageUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && editEvent) {
      setTitle(editEvent.title || "");
      setSolution(editEvent.solution || "");
      setStartDate(editEvent.startDate || "");
      setEndDate(editEvent.endDate || "");
      setTime(editEvent.time || "");
      
      const predefinedLocations = LOCATION_OPTIONS.slice(0, -1);
      const isCustomLocation = !predefinedLocations.some(loc => loc === editEvent.location);
      if (isCustomLocation) {
        setLocationOption("직접입력");
        setCustomLocation(editEvent.location || "");
      } else {
        setLocationOption(editEvent.location || "");
        setCustomLocation("");
      }
      
      setRegistrationUrl(editEvent.registrationUrl || "");
      setVivaEngageUrl(editEvent.vivaEngageUrl || "");
      setErrors({});
    } else if (open && !editEvent) {
      resetForm();
    }
  }, [open, editEvent]);

  const resetForm = () => {
    setTitle("");
    setSolution("");
    setStartDate("");
    setEndDate("");
    setTime("");
    setLocationOption("");
    setCustomLocation("");
    setRegistrationUrl("");
    setVivaEngageUrl("");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Event title is required";
    }
    if (!solution) {
      newErrors.solution = "Solution is required";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    if (!locationOption) {
      newErrors.location = "Location is required";
    }
    if (locationOption === "직접입력" && !customLocation.trim()) {
      newErrors.customLocation = "Please enter a location";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const location = locationOption === "직접입력" ? customLocation : locationOption;

    onAddEvent({
      title: title.trim(),
      solution: solution as Solution,
      startDate,
      endDate: endDate.trim() || undefined,
      time: time.trim() || undefined,
      location,
      registrationUrl: registrationUrl.trim() || undefined,
      vivaEngageUrl: vivaEngageUrl.trim() || undefined,
    });

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <X size={20} weight="bold" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold pr-8">
            {editEvent ? "Edit Marketing Event" : "Add Marketing Event"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">
              Event Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 text-base h-11"
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-sm text-destructive mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="solution" className="text-base font-semibold">
              Solution <span className="text-destructive">*</span>
            </Label>
            <Select value={solution} onValueChange={(value) => setSolution(value as Solution)}>
              <SelectTrigger id="solution" className="mt-2 text-base h-11">
                <SelectValue placeholder="Select solution" />
              </SelectTrigger>
              <SelectContent>
                {SOLUTIONS.map((sol) => (
                  <SelectItem key={sol} value={sol} className="text-base">
                    {sol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.solution && <p className="text-sm text-destructive mt-1">{errors.solution}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="text-base font-semibold">
                Start Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 text-base h-11"
              />
              {errors.startDate && <p className="text-sm text-destructive mt-1">{errors.startDate}</p>}
            </div>

            <div>
              <Label htmlFor="endDate" className="text-base font-semibold">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 text-base h-11"
              />
              {errors.endDate && <p className="text-sm text-destructive mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="time" className="text-base font-semibold">
              Time
            </Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 text-base h-11"
              placeholder="e.g. 2:00 PM - 4:00 PM"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-base font-semibold">
              Location <span className="text-destructive">*</span>
            </Label>
            <Select value={locationOption} onValueChange={setLocationOption}>
              <SelectTrigger id="location" className="mt-2 text-base h-11">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map((loc) => (
                  <SelectItem key={loc} value={loc} className="text-base">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && <p className="text-sm text-destructive mt-1">{errors.location}</p>}
          </div>

          {locationOption === "직접입력" && (
            <div>
              <Label htmlFor="customLocation" className="text-base font-semibold">
                Enter Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customLocation"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="mt-2 text-base h-11"
                placeholder="Enter custom location"
              />
              {errors.customLocation && <p className="text-sm text-destructive mt-1">{errors.customLocation}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="registrationUrl" className="text-base font-semibold">
              Registration Page URL
            </Label>
            <Input
              id="registrationUrl"
              value={registrationUrl}
              onChange={(e) => setRegistrationUrl(e.target.value)}
              className="mt-2 text-base h-11"
              placeholder="https://..."
            />
          </div>

          <div>
            <Label htmlFor="vivaEngageUrl" className="text-base font-semibold">
              Viva Engage URL
            </Label>
            <Input
              id="vivaEngageUrl"
              value={vivaEngageUrl}
              onChange={(e) => setVivaEngageUrl(e.target.value)}
              className="mt-2 text-base h-11"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" onClick={handleClose} className="text-base h-11 px-6">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90 text-base h-11 px-6">
            {editEvent ? "Update Event" : "Add Event"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
