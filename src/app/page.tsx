// app/page.tsx


import React from "react";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { PawPrint, Syringe, Scissors, ChevronRight, Stethoscope, Activity, FileText, FlaskConical } from "lucide-react";
import hero from "../../public/hero4.jpg";
import about from "../../public/hero2.png";
import ServiceCard from "@/components/ServiceCards";
import ClinicGallery from "@/components/ClinicGallery";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acasă | Clinica Bioveti",
  description: "Clinica Bioveti oferă servicii veterinare complete în Timișoara: consultații, chirurgie, analize, vaccinări și urgențe.",
};

async function getGalleryCategories() {
  const publicDir = path.join(process.cwd(), "public");
  const items = await fs.promises.readdir(publicDir, { withFileTypes: true });
  const categoryFolders = items.filter((item) => item.isDirectory());

  const categories = await Promise.all(
    categoryFolders.map(async (folder) => {
      const folderPath = path.join(publicDir, folder.name);
      const files = await fs.promises.readdir(folderPath);
      const images = files
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map((file) => ({
          src: `/${folder.name}/${file}`,
          alt: `${folder.name} image`,
        }));

      return {
        id: folder.name.toLowerCase().replace(/\s+/g, "-"),
        label: folder.name,
        images,
      };
    })
  );

  // Define the desired order and custom labels
  const orderMap: Record<string, { index: number; label: string }> = {
    "cladire": { index: 1, label: "Clădire" },
    "echipa": { index: 2, label: "Echipa" },
    "sala asteptare": { index: 3, label: "Sala Așteptare" },
    "consultatii si tratamente": { index: 4, label: "Sala Consultații și Tratamente" },
    "ecografie si terapie intensiva": { index: 5, label: "Ecografie și Terapie Intensivă" },
    "laborator-clinic veterinar": { index: 6, label: "Laborator Clinic Veterinar" },
    "sala de operatie (chirurgie)": { index: 7, label: "Sala de Operație" },
    "internare zi-noapte": { index: 8, label: "Internare Zi/Noapte" },
    "salon de coafura": { index: 9, label: "Salon de Coafură" },
    "farmacie & pet shop": { index: 10, label: "Farmacie și Petshop" },
  };

  const processedCategories = categories
    .map((cat) => {
      const lowerName = cat.label.toLowerCase();
      // Try to find a match in the orderMap. 
      // Note: folder names in public might vary slightly in casing, so we used lowerName logic above.
      // We need to be careful with exact matches. 
      // Let's rely on the folder name keys I saw in `list_dir`.

      const config = orderMap[lowerName] || { index: 999, label: cat.label };

      return {
        ...cat,
        label: config.label, // Use the custom label
        order: config.index,
      };
    })
    .sort((a, b) => a.order - b.order);

  // Filter out categories that might have been processed but we want to ensure we only return the ones we found/mapped or all of them sorted.
  // The previous logic filtered empty images, we should keep that.

  return processedCategories.filter((c) => c.images.length > 0);
}

export default async function Page() {
  const categories = await getGalleryCategories();
  return (
    <>
      {/* 
        HERO SECTION 
        - Changed h-screen to min-h-[100svh] for better mobile browser support 
      */}
      <section className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between">

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={hero}
            alt="Doi buldogi fericiți în parc"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient Overlay: Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col h-full pt-28 pb-4 md:pt-32 md:pb-8">

          {/* Text Area */}
          <div className="flex-1 flex flex-col justify-center md:justify-start md:mt-20">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] drop-shadow-lg tracking-tight">
                Pentru că nu sunt doar <br className="hidden sm:block" />
                animale de companie,
                <span className="block text-emerald-400 mt-2">sunt familie.</span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-200 max-w-xl font-medium drop-shadow-md hidden sm:block">
                Oferim îngrijire veterinară de top cu o atingere blândă.
                Cel mai bun prieten al tău merită cea mai bună sănătate.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 pb-8">
                <Link
                  href="/programare"
                  className="inline-flex justify-center items-center rounded-xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-900/30 transition transform hover:scale-[1.02] hover:bg-emerald-500 active:scale-95"
                >
                  Fă o Programare
                </Link>
              </div>
            </div>
          </div>


          <div className="mt-auto md:mt-0 w-full">
            {/* Label for mobile only */}


            <div className="
                    flex md:grid md:grid-cols-3 gap-4 
                    overflow-x-auto md:overflow-visible 
                    snap-x snap-mandatory 
                    pb-4 md:pb-0
                    -mx-4 px-4 md:mx-0 md:px-0
                    scrollbar-hide
                ">
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                {/*done*/}
                <ServiceCard
                  icon={<Stethoscope />}
                  title="Consultații"
                  description="Oferim consultații veterinare complete pentru evaluarea stării de sănătate, diagnostic rapid și recomandări personalizate pentru fiecare animal de companie."
                  href="/servicii/consultatii"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                {/*done*/}
                <ServiceCard
                  icon={<Activity />}
                  title="Tratamente de specialitate"
                  description="Intervenim cu tratamente avansate pentru afecțiuni dermatologice, digestive, respiratorii, oncologice și alte probleme medicale complexe."
                  href="/servicii/consultatii-specialitate"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                {/*done*/}
                <ServiceCard
                  icon={<Syringe />}
                  title="Tratamente profilactice (vaccinări / deparazitări)"
                  description="Asigurăm scheme de vaccinare și deparazitare adaptate fiecărui pacient, pentru protecție eficientă împotriva celor mai frecvente boli."
                  href="/servicii/vaccinari-profilaxie"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                { /*done*/}
                <ServiceCard
                  icon={<FileText />}
                  title="Servicii administrative"
                  description="Eliberăm carnet de sănătate, pașaport european, microcipare și înregistrare în RECS, alături de gestionarea digitală completă a istoricului medical."
                  href="/servicii/servicii-administrative"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                {/*done*/}
                <ServiceCard
                  icon={<Scissors />}
                  title="Chirurgie"
                  description="Realizăm intervenții chirurgicale în condiții de siguranță maximă: sterilizări, castrări, extirpări de formațiuni tumorale, chirurgie de țesuturi moi și tratamente postoperatorii."
                  href="/servicii/interventii-urgente"
                />
              </div>
              <div className="min-w-[85%] sm:min-w-[350px] md:min-w-0 snap-center">
                {/*done*/}
                <ServiceCard
                  icon={<FlaskConical />}
                  title="Analize de laborator"
                  description="Oferim analize rapide și precise: hemoleucogramă, biochimie, examen de urină, teste rapide, microscopie și investigații specializate."
                  href="/servicii/diagnostic-analize"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* IMAGE - Order 2 on mobile (below text), Order 1 on desktop */}
            <div className="order-2 lg:order-1 relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200">
                {/* Decorative box behind */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-emerald-100 rounded-2xl -z-10 hidden sm:block" />

                <Image
                  src={about}
                  alt="Veterinar având grijă de un câine fericit"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Subtle gradient at bottom for better integration */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
              </div>

              {/* Floating Stat Card - Mobile friendly positioning */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 max-w-[160px]">
                <p className="text-3xl font-black text-emerald-600">30+</p>
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Ani de Experiență</p>
              </div>
            </div>

            {/* TEXT - Order 1 on mobile, Order 2 on desktop */}
            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Despre Noi
              </span>

              <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1]">
                Ne place să avem grijă de animalele tale
              </h2>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                Clinica Veterinară Bioveti a luat naștere din dorința de a oferi animalelor de companie
                îngrijire medicală modernă, sigură și empatică. De peste 30 de ani, suntem partenerul tău de încredere.
              </p>

              {/* Features Grid */}
              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Personal Calificat",
                  "Îngrijire cu Compasiune",
                  "Cei Mai Buni Veterinari",
                  "Hrană de Calitate",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="font-semibold text-slate-800 text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Buttons - Full width on mobile */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="/programare"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
                >
                  Programează o Vizită
                </a>
                <a
                  href="/despre-noi"
                  className="w-full sm:w-auto inline-flex justify-center items-center rounded-xl border-2 border-slate-200 px-6 py-3.5 text-sm font-bold text-slate-700 hover:border-emerald-600 hover:text-emerald-600 transition-colors bg-transparent"
                >
                  Află Mai Multe
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >

      <ClinicGallery categories={categories} />
    </>
  );
}