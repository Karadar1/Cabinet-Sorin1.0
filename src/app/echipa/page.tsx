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
        
        .stat-card { 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          background: white;
          border-radius: 16px;
          padding: 2rem;
        }
        
        .stat-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 12px 32px ${PRIMARY_COLOR}1f; 
        }
        
        .feature-card {
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #fff 0%, ${LIGHTER_BG} 100%);
          border-radius: 16px;
          padding: 2rem;
        }
        
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
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

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div
          ref={headerRef}
          className="fade-up text-center mb-16 pt-12 md:pt-0"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 font-semibold text-sm">
              Echipa Noastră Veterinară
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Cunoaște Echipa de <span className="gradient-text">Veterinari</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Veterinarii noștri dedicați combină anii de experiență cu o compasiune autentică pentru a oferi cea mai bună îngrijire pentru companionii tăi iubiți.
          </p>
        </div>

        {/* Team Grid */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => {
                teamCardsRef.current[index] = el;
              }}
              // ADDED: h-full here
              className="scale-in h-full"
            >
              {/* ADDED: h-full here */}
              <div className="team-card h-full">
                {/* Circle Background with Image */}
                <div className="team-card-image-wrapper">
                  <div
                    className="team-card-bg"
                  ></div>
                  <Image
                    width={100}
                    height={100}
                    src={member.image}
                    alt={member.name}
                    className="team-card-image"
                  />
                </div>

                {/* Card Content - No extra info added */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                   
                  
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-100 to-transparent rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              De ce să alegi <span className="gradient-text">Echipa Noastră</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Experimentează diferența unei îngrijiri veterinare care combină expertiza, compasiunea și tehnologia de ultimă oră.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1 */}
              <div className="feature-card text-center">
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Îngrijire Expertă
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Veterinarii noștri sunt specialiști certificați cu zeci de ani de experiență combinată în îngrijirea animalelor.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="feature-card text-center">
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Abordare cu Compasiune
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Tratăm fiecare animal de companie ca și cum ar fi al nostru, oferind îngrijire blândă și iubitoare la fiecare vizită.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="feature-card text-center">
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Tehnologie Avansată
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Echipamentele și tehnicile de ultimă generație asigură cea mai înaltă calitate a îngrijirii pentru companionii tăi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;