"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { ServiceSelection } from "./ServiceSelection";
import { DateSelection } from "./DateSelection";
import { ClientInfo } from "./ClientInfo";
import { BookingSummary } from "./BookingSummary";
import { InfoPanel } from "./InfoPanel";
import { ChevronRight, ChevronLeft, CheckCircle2, PawPrint } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when step changes on mobile
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const [formData, setFormData] = useState({
    service: "",
    petName: "",
    petType: "câine",
    isNewClient: false,
    date: undefined as Date | undefined,
    slot: null as { start: string; end: string } | null,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });

  const updateData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.service && formData.petName;
      case 2:
        return formData.date && formData.slot;
      case 3:
        return formData.clientName && formData.clientPhone;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // doctorId: 1, // Removed hardcoded doctorId
          startISO: formData.slot?.start,
          endISO: formData.slot?.end,
          name: formData.clientName,
          phone: formData.clientPhone,
          species: formData.petType,
          reason: `[Serviciu: ${formData.service}] [Pacient: ${formData.petName}] [Client Nou: ${formData.isNewClient ? "Da" : "Nu"}]`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "A apărut o eroare.");
      }
    } catch (e) {
      setError("Eroare de conexiune.");
    } finally {
      setLoading(false);
    }
  };

  // --- Success View ---
  if (success) {
    return (
      // Added pt-24 here as well for consistency
      <div className="min-h-[80vh] flex items-center justify-center px-4 pt-24">
        <div className="max-w-md w-full text-center animate-in zoom-in-95 duration-500 bg-white p-8 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Programare Confirmată!</h1>
          <p className="text-slate-600 mb-8">
            Te așteptăm cu drag la clinică pe data de <br />
            <strong className="text-slate-900 text-lg">{formData.date?.toLocaleDateString("ro-RO")}</strong>.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-xl"
          >
            Programează altă vizită
          </Button>
        </div>
      </div>
    );
  }

  // --- Main View ---
  return (
    // UPDATED: Added `pt-24 md:pt-32` to clear the navbar
    <div className="min-h-screen bg-white pb-28 md:pb-12 pt-24 md:pt-32">

      {/* Mobile Compact Header - Changed top-0 to top-20 (approx) if your navbar is fixed, 
          or kept at top-0 if the navbar scrolls away. 
          Currently set to `top-[60px]` assuming a standard ~60px fixed navbar. 
          Adjust `top-[X]` to match your actual navbar height. */}
      <div className="md:hidden backdrop-blur-sm px-4 py-8 border-b border-slate-100 sticky top-[60px] z-30 -mt-8 mb-6 transition-all">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-primary" /> Programare
          </h1>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            Pasul {step} din 4
          </span>
        </div>
        {/* Mobile Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:py-4">
        {/* Desktop Header */}
        <header className="hidden md:block text-center mb-10 space-y-3">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Programează o vizită
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Completează formularul de mai jos pentru a rezerva un loc pentru prietenul tău necuvântător.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Main Wizard Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl md:rounded-3xl shadow-sm md:shadow-xl md:shadow-slate-200/50 border border-slate-200/60 md:border-slate-100 overflow-hidden">

            {/* Desktop Steps */}
            <div className="hidden md:block px-6 pt-6 pb-2 ">
              <StepIndicator currentStep={step} steps={["Serviciu", "Dată & Oră", "Date Contact", "Confirmare"]} />
            </div>

            {/* Content Area */}
            <div className="p-4 md:p-8 min-h-[300px] md:min-h-[400px]">
              {step === 1 && <ServiceSelection data={formData} updateData={updateData} />}
              {step === 2 && (
                <DateSelection
                  selectedDate={formData.date}
                  selectedSlot={formData.slot}
                  onSelectDateTime={(date, slot) => updateData({ date, slot })}
                  availableTimeSlots={async (date) => {
                    const dateISO = format(date, "yyyy-MM-dd");
                    try {
                      const res = await fetch(`/api/slots?date=${dateISO}&doctorId=1`);
                      if (!res.ok) {
                        const text = await res.text();
                        console.error("API Error:", text);
                        return [];
                      }
                      const json = await res.json();
                      return json.slots || [];
                    } catch (err) {
                      console.error("Fetch error:", err);
                      return [];
                    }
                  }}
                />
              )}

              {step === 3 && <ClientInfo data={formData} updateData={updateData} />}
              {step === 4 && <BookingSummary data={formData} />}

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center border border-red-100 animate-in slide-in-from-top-2">
                  {error}
                </div>
              )}
            </div>

            {/* Desktop Navigation (Standard) */}
            <div className="hidden md:flex p-6 bg-slate-50 border-t border-slate-100 justify-between items-center">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1 || loading}
                className={cn("text-slate-500 hover:text-slate-900 hover:bg-slate-100", step === 1 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Înapoi
              </Button>

              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:scale-105"
                >
                  Pasul Următor <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90 text-white px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-105"
                >
                  {loading ? "Se procesează..." : "Confirmă Programarea"}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar Info (Hidden on Mobile) */}
          <div className="lg:col-span-4 hidden lg:block">
            <InfoPanel />
          </div>
        </div>
      </div>

      {/* MOBILE STICKY FOOTER NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={step === 1 || loading}
            className={cn("flex-1 rounded-xl border-slate-200 h-12", step === 1 && "hidden")}
          >
            Înapoi
          </Button>

          {step < 4 ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className={cn(
                "bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12 shadow-md",
                step === 1 ? "w-full" : "flex-[2]"
              )}
            >
              Continuă <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] bg-primary hover:bg-primary/90 text-white rounded-xl h-12 shadow-md"
            >
              {loading ? "Se procesează..." : "Confirmă"}
            </Button>
          )}
        </div>
      </div>

    </div>
  );
}