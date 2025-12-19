export interface CalendarDay {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  dayOfMonth: number;
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export const getCalendarGrid = (year: number, month: number): CalendarWeek[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  
  const weeks: CalendarWeek[] = [];
  let currentWeek: CalendarDay[] = [];
  
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dateString = formatDate(current);
    
    currentWeek.push({
      date: new Date(current),
      dateString,
      isCurrentMonth: current.getMonth() === month,
      dayOfMonth: current.getDate()
    });
    
    if (currentWeek.length === 7) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
    
    current.setDate(current.getDate() + 1);
  }
  
  return weeks;
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString + 'T00:00:00');
};

export const getMonthName = (month: number): string => {
  const names = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return names[month];
};

export const isDateInRange = (date: string, startDate: string, endDate?: string): boolean => {
  const effectiveEndDate = endDate || startDate;
  return date >= startDate && date <= effectiveEndDate;
};

export const getEventPosition = (date: string, startDate: string, endDate?: string): 'start' | 'middle' | 'end' | 'single' => {
  const effectiveEndDate = endDate || startDate;
  if (startDate === effectiveEndDate) return 'single';
  if (date === startDate) return 'start';
  if (date === effectiveEndDate) return 'end';
  return 'middle';
};
