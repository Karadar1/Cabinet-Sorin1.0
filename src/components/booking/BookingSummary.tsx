import { format } from "date-fns";
import { ro } from "date-fns/locale";
import { Calendar, Clock, User, PawPrint, Stethoscope } from "lucide-react";

interface BookingSummaryProps {
  data: any;
}

export function BookingSummary({ data }: BookingSummaryProps) {
  const dateStr = data.date ? format(data.date, "EEEE, d MMMM yyyy", { locale: ro }) : "-";
  const timeStr = data.slot ? format(new Date(data.slot.start), "HH:mm") : "-";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Sumar Programare</h2>
        <p className="text-slate-500 text-sm mt-1">Verifică detaliile înainte de confirmare</p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 space-y-6 border border-slate-100">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Data</p>
                <p className="font-semibold text-slate-900 capitalize">{dateStr}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Ora</p>
                <p className="font-semibold text-slate-900">{timeStr}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-secondary">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Serviciu</p>
                <p className="font-semibold text-slate-900 capitalize">{data.service}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm text-secondary">
                <PawPrint className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Pacient</p>
                <p className="font-semibold text-slate-900">{data.petName} <span className="text-slate-400 font-normal">({data.petType})</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-slate-600">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Contact</p>
              <p className="font-semibold text-slate-900">{data.clientName}</p>
              <p className="text-sm text-slate-600">{data.clientPhone}</p>
              {data.clientEmail && <p className="text-sm text-slate-600">{data.clientEmail}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
