import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Stethoscope, Syringe, Scissors, Activity, PawPrint } from "lucide-react";

interface ServiceSelectionProps {
  data: any;
  updateData: (data: any) => void;
}

const services = [
  { id: "consult", name: "Consultație Generală", icon: Stethoscope, desc: "Control de rutină pentru sănătatea animalului." },
  { id: "vaccine", name: "Vaccinare", icon: Syringe, desc: "Imunizare anuală și deparazitare." },
  { id: "surgery", name: "Chirurgie / Sterilizare", icon: Activity, desc: "Intervenții chirurgicale și monitorizare." },
  { id: "grooming", name: "Toaletaj", icon: Scissors, desc: "Spălare, tuns și îngrijire." },
];

export function ServiceSelection({ data, updateData }: ServiceSelectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Ce serviciu dorești?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            const isSelected = data.service === service.id;
            return (
              <div
                key={service.id}
                onClick={() => updateData({ service: service.id })}
                className={cn(
                  "cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                  isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-100 bg-white"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg", isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{service.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{service.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Detalii despre pacient</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="petName">Numele animalului</Label>
            <Input
              id="petName"
              placeholder="ex: Rex"
              value={data.petName}
              onChange={(e) => updateData({ petName: e.target.value })}
              className="bg-slate-50 border-slate-200 focus:bg-white transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="petType">Specie</Label>
            <select
              id="petType"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-white transition-colors"
              value={data.petType}
              onChange={(e) => updateData({ petType: e.target.value })}
            >
              <option value="câine">Câine</option>
              <option value="pisică">Pisică</option>
              <option value="pasăre">Pasăre</option>
              <option value="rozător">Rozător</option>
              <option value="altul">Altul</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
           <input 
             type="checkbox" 
             id="newClient"
             checked={data.isNewClient}
             onChange={(e) => updateData({ isNewClient: e.target.checked })}
             className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
           />
           <Label htmlFor="newClient" className="font-normal cursor-pointer">
             Suntem clienți noi la această clinică
           </Label>
        </div>
      </div>
    </div>
  );
}
