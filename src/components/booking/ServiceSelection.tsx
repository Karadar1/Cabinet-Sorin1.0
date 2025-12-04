import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Stethoscope, Syringe, FileText, Microscope, Scan, Award, Siren, Bed } from "lucide-react";

interface ServiceSelectionProps {
  data: any;
  updateData: (data: any) => void;
}

const services = [
  { id: "consultatii", name: "Consultații generale", icon: Stethoscope, desc: "Evaluare completă și recomandări personalizate." },
  { id: "vaccinari-profilaxie", name: "Vaccinări & Profilaxie", icon: Syringe, desc: "Scheme de vaccinare și deparazitare." },
  { id: "servicii-administrative", name: "Identificare & Documente", icon: FileText, desc: "Pașaport, microcipare, RECS." },
  { id: "diagnostic-analize", name: "Diagnostic & Analize", icon: Microscope, desc: "Analize de laborator și teste rapide." },
  { id: "imagistica", name: "Imagistică", icon: Scan, desc: "Ecografie și endoscopie." },
  { id: "consultatii-specialitate", name: "Consultații specialitate", icon: Award, desc: "Dermatologie, oncologie, stomatologie." },
  { id: "interventii-urgente", name: "Chirurgie & Urgențe", icon: Siren, desc: "Intervenții chirurgicale și terapie intensivă." },
  { id: "spitalizare", name: "Spitalizare", icon: Bed, desc: "Îngrijire și monitorizare post-operatorie." },
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


      </div>
    </div>
  );
}
