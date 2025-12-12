"use client";
import React, { useEffect, useRef } from "react";
import {
  Award,
  Heart,
  Stethoscope,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";

// Define your custom colors
const PRIMARY_COLOR = "#224e4d"; // Dark Green
const SECONDARY_COLOR = "#356154"; // Medium Green
const LIGHT_ACCENT = "#e0ebeb"; // Custom light background/ring color
const LIGHTER_BG = "#f0fdf4"; // Very light green background

const TeamPage = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const teamCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const whyUsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (heroRef.current) observer.observe(heroRef.current);
    if (whyUsRef.current) observer.observe(whyUsRef.current);

    teamCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.transitionDelay = `${index * 100}ms`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Conf. Univ. Dr. Lazău Alexandru",
      specialty: "Chirurgie Animale Mici",
      experience: "15 ani",
      image: "/echipa/LazauAlexandru.jpeg",
      bio: "Pasionat de oferirea unei îngrijiri pline de compasiune, utilizând tehnici chirurgicale avansate.",
      icon: <Stethoscope className="w-5 h-5" />,
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Dr. Baderca Ștefan",
      specialty: "Chirurgie Ortopedică",
      experience: "14 ani",
      image: "/echipa/BadercaStefan.jpeg",
      bio: "Dedicat restabilirii mobilității și calității vieții prin chirurgie avansată.",
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Dr. Razavi Isabela",
      specialty: "Medicină Preventivă",
      experience: "8 ani",
      image: "/echipa/RazaviIsabela.jpeg",
      bio: "Concentrată pe examene de wellness și medicină preventivă pentru o viață lungă și sănătoasă.",
      icon: <Heart className="w-5 h-5" />,
      color: "from-yellow-400 to-lime-400",
    },
    {
      name: "Dr. Razavi Alin",
      specialty: "Urgențe",
      experience: "12 ani",
      image: "/echipa/RazaviAlin.jpeg",
      bio: "Specializat în terapie intensivă și medicină de urgență pentru toate tipurile de animale.",
      icon: <Heart className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Dr. Porojan Eveline",
      specialty: "Îngrijire Dentară",
      experience: "10 ani",
      image: "/echipa/PorojanEveline.jpeg",
      bio: "Expert în sănătate dentară, asigurând zâmbete strălucitoare pentru prietenii tăi blănoși.",
      icon: <Award className="w-5 h-5" />,
      color: "from-lime-500 to-green-500",
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-[${LIGHTER_BG}] to-cyan-50`}>
      <style>{`
        .fade-up { 
          opacity: 0; 
          transform: translateY(40px); 
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .fade-up.animate-in { 
          opacity: 1; 
          transform: translateY(0); 
        }
        
        .scale-in { 
          opacity: 0; 
          transform: scale(0.92) translateY(20px); 
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        .scale-in.animate-in { 
          opacity: 1; 
          transform: scale(1) translateY(0); 
        }
        
        .team-card { 
          position: relative; 
          background: white;
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          overflow: hidden;
        }
        
        .team-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .team-card:hover::before {
          transform: scaleX(1);
        }
        
        .team-card:hover { 
          transform: translateY(-12px); 
          box-shadow: 0 20px 40px ${PRIMARY_COLOR}26;
        }
        
        .team-card-image-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto 1.5rem;
        }
        
        .team-card-bg { 
          width: 160px; 
          height: 160px; 
          border-radius: 50%; 
          background: linear-gradient(135deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%); 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .team-card:hover .team-card-bg { 
          transform: scale(1.1) rotate(10deg); 
          opacity: 0.8;
        }
        
        .team-card-image { 
          position: absolute; 
          top: 8px; 
          left: 8px; 
          width: 144px; 
          height: 144px; 
          border-radius: 50%; 
          object-fit: cover; 
          border: 4px solid white; 
          box-shadow: 0 8px 24px rgba(0,0,0,0.15); 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          z-index: 1;
        }
        
        .team-card:hover .team-card-image { 
          transform: scale(1.05); 
          box-shadow: 0 12px 32px rgba(0,0,0,0.2); 
        }
        
        .feature-card {
          transition: all 0.3s ease;
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
        }
        
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          border-color: ${PRIMARY_COLOR}40;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .primary-icon-bg {
            background: linear-gradient(135deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%);
        }
      `}</style>

      {/* Hero Section Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Text Content */}
          <div ref={headerRef} className="fade-up order-2 lg:order-1 text-center lg:text-left">

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Cunoaște echipa de <br /> <span className="gradient-text">Medici Veterinari</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Medicii noștri dedicați combină anii de experiență cu o compasiune autentică pentru a oferi cea mai bună îngrijire pentru companionii tăi iubiți.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="#echipa" className="px-8 py-4 bg-[#224e4d] text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 hover:bg-[#356154] transition-all hover:-translate-y-1">
                Vezi Specialiștii
              </a>
            </div>
          </div>

          {/* New Image 1 */}
          <div ref={heroRef} className="scale-in order-1 lg:order-2 relative">
            <div className="absolute inset-0 bg-green-200 rounded-[32px] rotate-3 blur-sm transform scale-105 opacity-50"></div>
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <Image
                src="/team2.jpeg"
                alt="Echipa Bioveti - Poză de grup"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-left-6 bg-white p-4 rounded-xl shadow-xl border border-green-50 animate-bounce-slow hidden md:block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full text-green-700">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">100% Dedicare</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div id="echipa" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => {
                teamCardsRef.current[index] = el;
              }}
              className="scale-in h-full"
            >
              <div className="team-card h-full">
                {/* Circle Background with Image */}
                <div className="team-card-image-wrapper">
                  <div className="team-card-bg"></div>
                  <Image
                    width={100}
                    height={100}
                    src={member.image}
                    alt={member.name}
                    className="team-card-image"
                  />
                </div>

                {/* Card Content - Minimalist as requested */}
                <div className="text-center mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Redesigned Why Choose Us Section - Split Layout */}
        <div ref={whyUsRef} className="bg-white rounded-[40px] shadow-xl p-8 md:p-12 overflow-hidden relative border border-green-50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-green-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image Column */}
            <div className="relative h-full min-h-[400px]  overflow-hidden group flex items-center justify-center">
              <div className="relative w-full h-full min-h-[400px]">
                {/* Updated Image to be fully visible (object-contain) and removed hover scale to prevent clipping */}
                <Image
                  src="/team1.jpeg"
                  alt="Echipa Bioveti în acțiune"
                  fill
                  className="object-contain transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content Column with Updated Text */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                De ce Bioveti este <span className="gradient-text">Alegerea Potrivită</span>
              </h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                Combinăm expertiza medicală de vârf cu o empatie profundă pentru a oferi îngrijirea pe care o merită fiecare membru necuvântător al familiei.
              </p>

              <div className="space-y-6">
                {/* Feature Item 1 */}
                <div className="feature-card flex items-start gap-4">
                  <div className="primary-icon-bg w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Excelență Medicală Dovedită</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Echipa noastră este formată din medici veterinari și conferențiari universitari, asigurând accesul la cele mai noi protocoale de tratament.
                    </p>
                  </div>
                </div>

                {/* Feature Item 2 */}
                <div className="feature-card flex items-start gap-4">
                  <div className="primary-icon-bg w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Empatie în Fiecare Interacțiune</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Înțelegem legătura specială dintre tine și companionul tău. Tratăm fiecare pacient cu blândețe, răbdare și respect.
                    </p>
                  </div>
                </div>

                {/* Feature Item 3 */}
                <div className="feature-card flex items-start gap-4">
                  <div className="primary-icon-bg w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Diagnosticare de Precizie</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Investim constant în tehnologie de ultimă generație pentru a identifica rapid și corect problemele de sănătate, de la analize la imagistică.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;