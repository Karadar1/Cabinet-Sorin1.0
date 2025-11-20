import { MapPin, Phone, Clock, Info } from "lucide-react";

export function InfoPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit sticky top-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-secondary" />
        Informații Clinică
      </h3>
      
      <div className="space-y-6">
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900">Program</h4>
            <p className="text-sm text-slate-600 mt-1">Luni - Vineri: 09:00 - 17:00</p>
            <p className="text-sm text-slate-600">Sâmbătă: 10:00 - 14:00</p>
            <p className="text-sm text-slate-600">Duminică: Închis</p>
          </div>
        </div>

        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900">Locație</h4>
            <p className="text-sm text-slate-600 mt-1">
              Strada Exemplului Nr. 123,<br />
              București, Sector 1
            </p>
            <div className="mt-2 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400 border">
              [Hartă Placeholder]
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900">Contact</h4>
            <p className="text-sm text-slate-600 mt-1">
              <a href="tel:+40123456789" className="hover:text-secondary transition-colors">
                +40 123 456 789
              </a>
            </p>
            <p className="text-sm text-slate-600">
              <a href="mailto:contact@cabinetsorin.ro" className="hover:text-secondary transition-colors">
                contact@cabinetsorin.ro
              </a>
            </p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-semibold text-sm text-slate-900 mb-2">Politica de anulare</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Vă rugăm să ne anunțați cu cel puțin 24 de ore înainte dacă doriți să anulați sau să reprogramați vizita.
          </p>
        </div>
      </div>
    </div>
  );
}
