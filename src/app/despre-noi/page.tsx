"use client";
import React from "react";
import {
    Heart,
    Award,
    Stethoscope,
    MessageCircle,
    CheckCircle2,
    Building2,
    Syringe,
    ShoppingBag,
    Truck,
    Wheat
} from "lucide-react";

// Brand colors
const PRIMARY_COLOR = "#224e4d"; // Dark Green
// const SECONDARY_COLOR = "#356154"; // Medium Green - kept for reference if needed
// const LIGHT_BG = "#f0fdf4"; // Very light green background - kept for reference if needed

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Povestea Noastră */}
            <div className="relative py-20 bg-slate-50 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#224e4d_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-4">
                            Povestea Noastră
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Despre <span style={{ color: PRIMARY_COLOR }}>Bioveti</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Clinica Veterinară Bioveti a luat naștere din dorința de a oferi animalelor de companie îngrijire medicală modernă, sigură și empatică. De peste 30 de ani, misiunea noastră este să fim un partener de încredere pentru familiile care aleg să își protejeze și să iubească animalele la fel de mult ca noi.
                        </p>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                            Cu o echipă dedicată și pasionată, îmbinăm experiența acumulată în timp cu tehnologia medicală actuală pentru a oferi servicii complete — de la consultații și prevenție, până la chirurgie, stomatologie, endoscopie, analize avansate, terapie intensivă și monitorizare atentă.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section - Ce ne reprezintă */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">Ce ne reprezintă</h2>
                        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard
                            icon={<Heart className="w-8 h-8 text-white" />}
                            title="Empatie și grijă reală"
                            description="Fiecare pacient este tratat cu blândețe și răbdare, ca și cum ar fi propriul nostru animal. Ne străduim să reducem stresul și să transformăm vizita în cabinet într-o experiență cât mai plăcută."
                        />
                        <ValueCard
                            icon={<Award className="w-8 h-8 text-white" />}
                            title="Profesionalism & competență"
                            description="Echipa Bioveti este formată din medici veterinari cu specializări diverse, care participă constant la cursuri și conferințe pentru a rămâne la zi cu cele mai noi protocoale medicale."
                        />
                        <ValueCard
                            icon={<Stethoscope className="w-8 h-8 text-white" />}
                            title="Tehnologie modernă"
                            description="Aparatura de diagnostic de ultimă generație și laboratoarele integrate ne permit să stabilim rapid și precis diagnosticul, pentru un tratament cât mai eficient."
                        />
                        <ValueCard
                            icon={<MessageCircle className="w-8 h-8 text-white" />}
                            title="Comunicare transparentă"
                            description="Explicăm fiecare pas, fiecare opțiune și fiecare tratament, astfel încât proprietarii să poată lua decizii informate și potrivite pentru animalele lor."
                        />
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Misiunea noastră
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Să oferim îngrijire medicală la standarde înalte, într-un mediu prietenos și sigur, în care animalele să se simtă în siguranță, iar proprietarii să găsească sprijin, înțelegere și răspunsuri clare.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                Viziunea noastră
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Să devenim un centru veterinar de referință în zonă, cunoscut pentru profesionalism, compasiune și rezultate medicale excelente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Bioveti */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-emerald-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -mr-16 -mt-16"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-50 -ml-16 -mb-16"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">De ce Bioveti?</h2>
                                <div className="space-y-4">
                                    {[
                                        "Experiență vastă de peste 30 de ani",
                                        "Servicii complete în aceeași locație",
                                        "Echipamente moderne și proceduri actualizate",
                                        "Abordare personalizată pentru fiecare pacient",
                                        "Monitorizare digitală și notificări automate",
                                        "Medici dedicați, empatici și mereu pregătiți",
                                        "Focus pe prevenție și educație pentru proprietari"
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                                            <span className="text-lg font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block relative h-full min-h-[400px]">
                                <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <p className="text-2xl font-bold mb-2">30+ Ani</p>
                                        <p className="text-emerald-200">De Excelență Veterinară</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bioveti Farm Impex Section - Company Info */}
            <div className="py-16 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm">Bine de știut!</span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">Bioveti Farm Impex – Despre companie</h2>
                        <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
                            Bioveti Farm Impex este o companie cu activitate complexă în domeniul veterinar, construită pe experiență, profesionalism și dorința de a sprijini atât medicii veterinari, cât și proprietarii de animale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <CompanyActivityCard
                            icon={<Truck className="w-6 h-6" />}
                            title="1. Distribuție produse veterinare"
                            description="Oferim o gamă variată de medicamente, suplimente, accesorii și produse de îngrijire destinate cabinetelor și fermelor, asigurând livrare rapidă și stocuri actualizate."
                        />
                        <CompanyActivityCard
                            icon={<Stethoscope className="w-6 h-6" />}
                            title="2. Servicii veterinare"
                            description="Prin clinica noastră, punem la dispoziție consultații, tratamente, chirurgie, analize și servicii complete pentru animalele de companie."
                        />
                        <CompanyActivityCard
                            icon={<Wheat className="w-6 h-6" />}
                            title="3. Producție de furaje"
                            description="Fabricăm furaje de calitate pentru diverse specii de animale, folosind rețete echilibrate și ingrediente sigure."
                        />
                        <CompanyActivityCard
                            icon={<ShoppingBag className="w-6 h-6" />}
                            title="4. Importator direct de hrană"
                            description="Suntem importator oficial al unor branduri premium din Spania, oferind clienților hrană sănătoasă, nutritivă și atent selecționată."
                        />
                        <CompanyActivityCard
                            icon={<Building2 className="w-6 h-6" />}
                            title="5. Farmacie veterinară & Pet Shop"
                            description="În locația noastră (Crisan nr 8 parter) găsiți medicamente, suplimente, diete veterinare, produse antiparazitare, accesorii, jucării, hrană de calitate, furaje și tot ce este necesar pentru bunăstarea animalelor."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-components
function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center group">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );
}

function CompanyActivityCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors group">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}