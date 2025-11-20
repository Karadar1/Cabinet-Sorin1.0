import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Phone, Mail } from "lucide-react";

interface ClientInfoProps {
  data: any;
  updateData: (data: any) => void;
}

export function ClientInfo({ data, updateData }: ClientInfoProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">Datele tale de contact</h2>
        <p className="text-slate-500 text-sm mt-1">Unde îți putem trimite confirmarea?</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName" className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" /> Nume complet
          </Label>
          <Input
            id="clientName"
            placeholder="Popescu Ion"
            value={data.clientName}
            onChange={(e) => updateData({ clientName: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientPhone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" /> Telefon
          </Label>
          <Input
            id="clientPhone"
            placeholder="07xx xxx xxx"
            value={data.clientPhone}
            onChange={(e) => updateData({ clientPhone: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" /> Email (opțional)
          </Label>
          <Input
            id="clientEmail"
            type="email"
            placeholder="exemplu@email.com"
            value={data.clientEmail}
            onChange={(e) => updateData({ clientEmail: e.target.value })}
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}
