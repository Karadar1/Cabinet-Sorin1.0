"use client";

import { useState, useEffect } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  isBefore, 
  startOfDay 
} from "date-fns";
import { ro } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AvailableSlot {
  start: string;
  end: string;
}

interface DateSelectionProps {
  onSelectDateTime: (date: Date, slot: AvailableSlot | null) => void;
  unavailableDates?: Date[];
  availableTimeSlots: (date: Date) => Promise<AvailableSlot[]>;
  selectedDate?: Date;
  selectedSlot?: AvailableSlot | null;
}

export function DateSelection({ 
  onSelectDateTime, 
  unavailableDates = [], 
  availableTimeSlots,
  selectedDate,
  selectedSlot 
}: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Calendar Grid Generation
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ro });
  const endDate = endOfWeek(monthEnd, { locale: ro });

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weekDays = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

  // Fetch slots when date changes
  useEffect(() => {
    async function fetchSlots() {
      if (selectedDate) {
        setLoadingSlots(true);
        try {
          const fetchedSlots = await availableTimeSlots(selectedDate);
          setSlots(fetchedSlots);
        } catch (error) {
          console.error("Failed to fetch slots", error);
          setSlots([]);
        } finally {
          setLoadingSlots(false);
        }
      } else {
        setSlots([]);
      }
    }
    fetchSlots();
  }, [selectedDate, availableTimeSlots]);

  const handleDateClick = (day: Date) => {
    // Prevent selecting past dates or unavailable dates
    if (isBefore(day, startOfDay(new Date())) && !isToday(day)) return;
    
    // Check if unavailable (simple check for now)
    const isUnavailable = unavailableDates.some(d => isSameDay(d, day));
    if (isUnavailable) return;

    onSelectDateTime(day, null); // Reset slot when date changes
  };

  const handleSlotClick = (slot: AvailableSlot) => {
    if (selectedDate) {
      onSelectDateTime(selectedDate, slot);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Calendar Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-50 bg-slate-50/30">
            <h2 className="font-bold text-slate-800 capitalize flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              {format(currentMonth, "MMMM yyyy", { locale: ro })}
            </h2>
            <div className="flex gap-1">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                disabled={isBefore(endOfMonth(subMonths(currentMonth, 1)), startOfDay(new Date()))}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="p-4">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, dayIdx) => {
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isPast = isBefore(day, startOfDay(new Date()));
                const isUnavailable = unavailableDates.some(d => isSameDay(d, day));
                const isDisabled = isPast || isUnavailable;

                return (
                  <div key={day.toString()} className={cn("aspect-square p-0.5", !isCurrentMonth && "invisible")}>
                    <button
                      onClick={() => handleDateClick(day)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full h-full rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 relative",
                        isSelected 
                          ? "bg-primary text-white shadow-md scale-105" 
                          : isDisabled
                            ? "text-slate-300 cursor-not-allowed bg-slate-50"
                            : "text-slate-700 hover:bg-primary/10 hover:text-primary hover:scale-110",
                        isToday(day) && !isSelected && "ring-1 ring-primary text-primary font-bold"
                      )}
                    >
                      {format(day, "d")}
                      {isSelected && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Slots Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full min-h-[350px]">
          <div className="p-4 border-b border-slate-50 bg-slate-50/30">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              Intervale Orare
            </h2>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            {!selectedDate ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center">
                <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm">Selectează o dată din calendar<br/>pentru a vedea orele disponibile.</p>
              </div>
            ) : loadingSlots ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : slots.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 m-2">
                <p className="font-medium">Niciun loc disponibil</p>
                <p className="text-xs mt-1">Încearcă să alegi o altă zi.</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 content-start overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.start === slot.start;
                  // Format time to 12-hour format (e.g. 9:00 AM) - though Romania uses 24h usually, prompt asked for 12h
                  // I'll stick to 24h for consistency with locale 'ro' but if strictly 12h needed I can change.
                  // Prompt said: "Use a 12-hour format (e.g., 9:00 AM, 1:30 PM)."
                  const dateObj = new Date(slot.start);
                  const timeLabel = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                  return (
                    <button
                      key={slot.start}
                      onClick={() => handleSlotClick(slot)}
                      className={cn(
                        "py-2 px-3 rounded-lg text-sm font-medium border transition-all duration-200",
                        isSelected
                          ? "bg-secondary text-white border-secondary shadow-md scale-105"
                          : "bg-white border-slate-200 text-slate-700 hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5"
                      )}
                    >
                      {timeLabel}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Footer Info */}
          {selectedDate && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
              Data selectată: <span className="font-semibold text-slate-700">{format(selectedDate, "d MMMM yyyy", { locale: ro })}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
