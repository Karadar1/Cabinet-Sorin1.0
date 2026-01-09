import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail } from "lucide-react";

interface ClientInfoProps {
  data: any;
  updateData: (data: any) => void;
}

export function ClientInfo({ data, updateData }: ClientInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto pb-10">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Datele tale de contact</h2>
        <p className="text-slate-500 text-sm mt-1">Unde îți putem trimite confirmarea?</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName" className="flex items-center gap-2 text-slate-700 font-bold text-base mb-1">
            <User className="w-5 h-5 text-slate-500" /> Nume complet
          </Label>
          <Input
            id="clientName"
            placeholder="Popescu Ion"
            value={data.clientName}
            onChange={(e) => updateData({ clientName: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientPhone" className="flex items-center gap-2 text-slate-700 font-bold text-base mb-1">
            <Phone className="w-5 h-5 text-slate-500" /> Telefon
          </Label>
          <Input
            id="clientPhone"
            placeholder="07xx xxx xxx"
            value={data.clientPhone}
            onChange={(e) => updateData({ clientPhone: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail" className="flex items-center gap-2 text-slate-700 font-bold text-base mb-1">
            <Mail className="w-5 h-5 text-slate-500" /> Email (opțional)
          </Label>
          <Input
            id="clientEmail"
            type="email"
            placeholder="exemplu@email.com"
            value={data.clientEmail}
            onChange={(e) => updateData({ clientEmail: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
