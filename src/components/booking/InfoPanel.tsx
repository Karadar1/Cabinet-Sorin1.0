import { MapPin, Phone, Clock, Info } from "lucide-react";

export function InfoPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit sticky top-8">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-secondary" />
        Informații Clinică
      </h3>

      <div className="space-y-6">
        {/* Schedule */}
        <div className="flex gap-3">
          <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900">Program</h4>
            <p className="text-sm text-slate-600 mt-1">Luni - Vineri: 08:00 - 18:00</p>
            <p className="text-sm text-slate-600">Sâmbătă: 08:30 - 14:00</p>
            <p className="text-sm text-slate-600">Duminică: Închis</p>
          </div>
        </div>

        {/* Location & Map */}
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="w-full">
            <h4 className="font-semibold text-sm text-slate-900">Locație</h4>
            <p className="text-sm text-slate-600 mt-1">
              Strada Crișan Nr.8,<br />
              Timișoara
            </p>
            <div className="mt-3 aspect-video w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                src="https://maps.google.com/maps?q=Strada+Crisan+Nr.8,+Timisoara&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Mini Map"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary hover:underline mt-1 inline-block"
            >
              Deschide în Google Maps
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex gap-3">
          <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900">Contact</h4>
            <div className="flex flex-col mt-1 gap-1">
              <a href="tel:0755090880" className="text-sm text-slate-600 hover:text-secondary transition-colors">
                0755 090 880
              </a>
              <a href="tel:0256442989" className="text-sm text-slate-600 hover:text-secondary transition-colors">
                0256 442 989
              </a>
            </div>
            <p className="text-sm text-slate-600 mt-2">
              <a href="mailto:clinicabioveti@gmail.com" className="hover:text-secondary transition-colors break-all">
                clinicabioveti@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}