

import { notFound } from "next/navigation";
import Link from "next/link";

import {
  Phone,
  MapPin,
  Clock,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Wallet
} from "lucide-react";
import { services } from "@/lib/services-data";

export default function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ServicePageContent params={params} />;
}

async function ServicePageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">

        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          {service.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
          {service.shortDescription}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-16">

            {/* Overview */}
            <section className="prose prose-lg prose-slate max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.fullContent }} />
            </section>

            {/* Benefits Grid */}
            {service.benefits.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Beneficii Cheie
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process Timeline */}
            {service.process.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Cum decurge procesul?</h2>
                <div className="relative border-l-2 border-emerald-100 ml-3 space-y-12">
                  {service.process.map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white" />
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1 block">
                        Pasul {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Section (using details/summary for server-side interactivity) */}
            {service.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-emerald-500" />
                  Întrebări Frecvente
                </h2>
                <div className="space-y-4">
                  {service.faq.map((item, idx) => (
                    <details key={idx} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-slate-50 transition-colors">
                        <span className="font-semibold text-slate-900">{item.question}</span>
                        <span className="transition-transform group-open:rotate-180">
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        </span>
                      </summary>
                      <div className="px-4 pb-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-transparent group-open:border-slate-100 group-open:pt-4">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">



            {/* CTA Card */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">
                Programează o vizită
              </h3>
              <p className="text-emerald-700 text-sm mb-6">
                Asigură-te că prietenul tău primește cea mai bună îngrijire.
              </p>
              <Link
                href="/#programare"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
              >
                Programează Online
              </Link>
            </div>

            {/* Other Services Navigation */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Alte Servicii
              </h3>
              <nav className="space-y-2">
                {services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicii/${s.slug}`}
                      className="block p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-emerald-600 transition-colors text-sm font-medium"
                    >
                      {s.title}
                    </Link>
                  ))}
              </nav>
            </div>

            {/* Quick Contact */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-4">Contact Rapid</h3>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>0755 090 880</span>
                  <span>0256 442 989</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Str. Crișan Nr.8, Timișoara</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>L-V: 08:00–18:00</span>
                  <span>S: 08:30–14:00</span>
                  <span>D: Închis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
