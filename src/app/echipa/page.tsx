"use client";
import React, { useEffect, useRef } from "react";
import {
  Award,
  Heart,
  Stethoscope,
  GraduationCap,
  Users,
  Clock,
  Star,
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
  const statsRef = useRef<HTMLDivElement | null>(null);
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
    if (statsRef.current) observer.observe(statsRef.current);

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
      name: "Dr. Sarah Mitchell",
      role: "Chief Veterinarian",
      specialty: "Small Animal Surgery",
      experience: "15 years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      bio: "Passionate about providing compassionate care with advanced surgical techniques.",
      icon: <Stethoscope className="w-5 h-5" />,
      // Replaced with a Green/Teal gradient
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Dr. Michael Chen",
      role: "Senior Veterinarian",
      specialty: "Emergency Care",
      experience: "12 years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      bio: "Specializes in critical care and emergency medicine for all pet types.",
      icon: <Heart className="w-5 h-5" />,
      // Replaced with a Blue/Cyan gradient
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Veterinary Dentist",
      specialty: "Dental Care",
      experience: "10 years",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      bio: "Expert in dental health, ensuring bright smiles for your furry friends.",
      icon: <Award className="w-5 h-5" />,
      // Replaced with a Lime/Green gradient
      color: "from-lime-500 to-green-500",
    },
    {
      name: "Dr. James Williams",
      role: "Veterinary Surgeon",
      specialty: "Orthopedic Surgery",
      experience: "14 years",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      bio: "Dedicated to restoring mobility and quality of life through advanced surgery.",
      icon: <GraduationCap className="w-5 h-5" />,
      // Replaced with a Violet/Purple gradient
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Dr. Lisa Thompson",
      role: "Veterinarian",
      specialty: "Preventive Care",
      experience: "8 years",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      bio: "Focused on wellness exams and preventive medicine for long, healthy lives.",
      icon: <Heart className="w-5 h-5" />,
      // Replaced with a Yellow/Lime gradient
      color: "from-yellow-400 to-lime-400",
    },
    {
      name: "Dr. David Park",
      role: "Exotic Animal Specialist",
      specialty: "Exotic Pets",
      experience: "11 years",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      bio: "Expert care for birds, reptiles, and other unique companions.",
      icon: <Award className="w-5 h-5" />,
      // Replaced with a Cyan/Blue gradient
      color: "from-cyan-400 to-blue-400",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "10,000+",
      label: "Happy Pets",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "70+",
      label: "Years Combined Experience",
    },
    {
      icon: <Star className="w-6 h-6" />,
      value: "4.9/5",
      label: "Average Rating",
    },
  ];

  return (
    // Updated background gradient from orange/yellow to soft greens/blues
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
          /* Updated top border to Primary Green */
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
          /* Updated hover shadow to Primary Green */
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
          /* Updated image background to soft green gradient */
          background: linear-gradient(135deg, ${LIGHT_ACCENT} 0%, #e8f5e9 100%); 
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
        
        .team-info { 
          opacity: 0; 
          max-height: 0;
          transform: translateY(-10px); 
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); 
          overflow: hidden;
        }
        
        .team-card:hover .team-info { 
          opacity: 1; 
          max-height: 200px;
          transform: translateY(0); 
        }
        
        .stat-card { 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
          background: white;
          border-radius: 16px;
          padding: 2rem;
        }
        
        .stat-card:hover { 
          transform: translateY(-8px); 
          /* Updated stat card hover shadow */
          box-shadow: 0 12px 32px ${PRIMARY_COLOR}1f; 
        }
        
        .feature-card {
          transition: all 0.3s ease;
          /* Updated feature card background to soft green/white */
          background: linear-gradient(135deg, #fff 0%, ${LIGHTER_BG} 100%);
          border-radius: 16px;
          padding: 2rem;
        }
        
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }
        
        .gradient-text {
          /* Updated gradient text to Primary/Secondary Green */
          background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .primary-icon-bg {
            /* Primary button/icon background */
            background: linear-gradient(135deg, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%);
        }
      `}</style>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div
          ref={headerRef}
          className="fade-up text-center mb-16 pt-12 md:pt-0"
        >
          {/* Updated accent tag color */}
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 rounded-full">
            <span className="text-green-700 font-semibold text-sm">
              Our Veterinary Team
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Meet Our Expert <span className="gradient-text">Veterinarians</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated veterinarians combine years of experience with genuine
            compassion to provide the best care for your beloved companions.
          </p>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="fade-up mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card text-center">
                {/* Updated stat icon background and color */}
                <div className={`bg-[${LIGHT_ACCENT}] w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div style={{ color: PRIMARY_COLOR }}>{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
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
              className="scale-in"
            >
              <div className="team-card">
                {/* Circle Background with Image */}
                <div className="team-card-image-wrapper">
                  <div
                    // Member-specific color is kept but updated to general green-themed colors
                    className={`team-card-bg bg-gradient-to-br ${member.color}`}
                  ></div>
                  <Image
                    width={100}
                    height={100}
                    src={member.image}
                    alt={member.name}
                    className="team-card-image"
                  />
                </div>

                {/* Card Content */}
                <div className="text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {/* Updated role icon color */}
                    <div style={{ color: PRIMARY_COLOR }}>{member.icon}</div>
                    <p style={{ color: SECONDARY_COLOR }} className="font-semibold text-sm">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mb-1">
                    {member.specialty}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {member.experience} of experience
                  </p>

                  {/* Info that appears on hover */}
                  <div className="team-info">
                    {/* Updated divider line color */}
                    <div className={`h-px bg-gradient-to-r from-transparent via-[${SECONDARY_COLOR}50] to-transparent mb-3`}></div>
                    <p className="text-gray-600 text-sm leading-relaxed px-2">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden relative">
          {/* Updated background blurs to green/cyan */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-100 to-transparent rounded-full blur-3xl opacity-50"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-4">
              Why Choose <span className="gradient-text">Our Team</span>
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Experience the difference of veterinary care that combines
              expertise, compassion, and cutting-edge technology
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature Card 1: Expert Care */}
              <div className="feature-card text-center">
                {/* Updated icon background to Primary/Secondary Green */}
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Expert Care
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Our veterinarians are board-certified specialists with decades
                  of combined experience in animal care.
                </p>
              </div>

              {/* Feature Card 2: Compassionate Approach */}
              <div className="feature-card text-center">
                {/* Updated icon background to Primary/Secondary Green */}
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Compassionate Approach
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  We treat every pet as if they were our own, providing gentle,
                  loving care at every visit.
                </p>
              </div>

              {/* Feature Card 3: Advanced Technology */}
              <div className="feature-card text-center">
                {/* Updated icon background to Primary/Secondary Green */}
                <div className="primary-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Advanced Technology
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  State-of-the-art equipment and techniques ensure the highest
                  quality care for your companions.
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