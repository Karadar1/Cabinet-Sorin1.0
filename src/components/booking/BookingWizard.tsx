"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "./StepIndicator";
import { ServiceSelection } from "./ServiceSelection";
import { DateSelection } from "./DateSelection";
import { ClientInfo } from "./ClientInfo";
import { BookingSummary } from "./BookingSummary";
import { InfoPanel } from "./InfoPanel";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";


export default function BookingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          doctorId: 1, // Hardcoded for now
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

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Programare Confirmată!</h1>
        <p className="text-lg text-slate-600 mb-8">
          Te așteptăm cu drag la clinică pe data de <strong>{formData.date?.toLocaleDateString("ro-RO")}</strong>.
        </p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl"
        >
          Programează altă vizită
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <header className="text-center mb-10 space-y-3">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Programează o vizită
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Completează formularul de mai jos pentru a rezerva un loc pentru prietenul tău necuvântător.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Wizard Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="bg-slate-50/50 px-6 pt-6 pb-2 border-b border-slate-100">
            <StepIndicator currentStep={step} steps={["Serviciu", "Dată & Oră", "Date Contact", "Confirmare"]} />
          </div>

          <div className="p-6 md:p-8 min-h-[400px]">
            {step === 1 && <ServiceSelection data={formData} updateData={updateData} />}
            {step === 2 && (
              <DateSelection 
                selectedDate={formData.date}
                selectedSlot={formData.slot}
                onSelectDateTime={(date, slot) => updateData({ date, slot })}
                availableTimeSlots={async (date) => {
                  const dateISO = format(date, "yyyy-MM-dd");
                  const res = await fetch(`/api/slots?date=${dateISO}&doctorId=1`);
                  const json = await res.json();
                  return json.slots || [];
                }}
              />
            )}

            {step === 3 && <ClientInfo data={formData} updateData={updateData} />}
            {step === 4 && <BookingSummary data={formData} />}
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center border border-red-100">
                {error}
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 1 || loading}
              className={cn("text-slate-500 hover:text-slate-900", step === 1 && "invisible")}
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

        {/* Sidebar Info */}
        <div className="lg:col-span-4 hidden lg:block">
          <InfoPanel />
        </div>
      </div>
    </div>
  );
}
