"use client";

import type React from "react";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Mail,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Code,
  Cpu,
  Layers,
  Terminal,
  Database,
  Zap,
} from "lucide-react";
import NeonText from "../components/neon-text";
import EnhancedGlitchImage from "../components/enhanced-glitch-image";
import PsychicEnergy from "../components/psychic-energy";
import AkiraButton from "../components/akira-button";
import BikeTrail from "../components/bike-trail";
import dynamic from "next/dynamic";
import UnifiedNavigation from "../components/unified-navigation";
import TechShowcase from "../components/tech-showcase";
// nmdf
// Replace the direct imports of heavy components with lazy loaded versions
const NeoTokyoShowcase = dynamic(
  () => import("../components/neo-tokyo-showcase"),
  {
    loading: () => (
      <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg border border-red-800/50"></div>
    ),
  }
);
const technologies = [
  {
    name: "React",
    description:
      "A JavaScript library for building user interfaces with a component-based architecture.",
    icon: <Code className="h-5 w-5" />,
    category: "frontend",
    level: 92,
    link: "https://reactjs.org",
  },
  {
    name: "Next.js",
    description:
      "The React framework for production that enables server-side rendering and static site generation.",
    icon: <Cpu className="h-5 w-5" />,
    category: "frontend",
    level: 88,
    link: "https://nextjs.org",
  },
  {
    name: "Three.js",
    description:
      "JavaScript 3D library that makes WebGL simpler, enabling 3D graphics in the browser.",
    icon: <Layers className="h-5 w-5" />,
    category: "3d",
    level: 78,
    link: "https://threejs.org",
  },
  {
    name: "Framer Motion",
    description:
      "A production-ready motion library for React that makes creating animations easy.",
    icon: <Zap className="h-5 w-5" />,
    category: "animation",
    level: 85,
    link: "https://www.framer.com/motion",
  },
  {
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework for rapidly building custom user interfaces.",
    icon: <Code className="h-5 w-5" />,
    category: "frontend",
    level: 95,
    link: "https://tailwindcss.com",
  },
  {
    name: "WebGL",
    description:
      "JavaScript API for rendering interactive 2D and 3D graphics within any web browser.",
    icon: <Layers className="h-5 w-5" />,
    category: "3d",
    level: 75,
    link: "https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API",
  },
  {
    name: "GSAP",
    description:
      "Professional-grade animation for the modern web, making complex animations simple.",
    icon: <Zap className="h-5 w-5" />,
    category: "animation",
    level: 82,
    link: "https://greensock.com/gsap/",
  },
  {
    name: "TypeScript",
    description:
      "A strongly typed programming language that builds on JavaScript, giving better tooling.",
    icon: <Terminal className="h-5 w-5" />,
    category: "frontend",
    level: 90,
    link: "https://www.typescriptlang.org/",
  },
];
const DataTransmission = dynamic(
  () => import("../components/data-transmission"),
  {
    loading: () => (
      <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg border border-red-800/50"></div>
    ),
  }
);

const CityScape = dynamic(() => import("../components/city-scape"), {
  ssr: false, // Disable SSR for canvas-based components
});

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  // Project information
  const projectInfo = {
    name: "Sumit's Portfolio",
    description: "Portfolio website for showcasing projects and skills",
    author: "Sumit Pokhrel",
    contact: {
      email: "pokhrelsumit36@gmail.com",
      phone: "9842134149",
      address: "Buddhashanti-2, Jhapa",
    },
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      github: "https://github.com/ozsumit",
    },
    technologies: {
      frontend: ["Next.js", "React", "Tailwind CSS"],
      animations: ["Framer Motion"],
      particles: ["tsparticles"],
      other: ["clsx", "simplex-noise"],
    },
    bio: "Cybernetic developer navigating the digital wasteland of Neo-Tokyo. Specializing in creating immersive web experiences that blur the line between reality and digital consciousness. When not coding, I'm exploring the neon-lit streets searching for the next technological breakthrough.",
  };

  // Project data structure - Add new projects by following this format
  const projects = [
    {
      id: 1,
      title: "Crescent Moon",
      description:
        "Discover cinematic magic, one frame at a time. Your ultimate destination for endless entertainment.",
      tags: ["Next.js", "Javascript", "TMDB API", "Tailwind CSS"],
      image:
        "https://private-user-images.githubusercontent.com/129023326/425557834-7f29c0cd-9cfe-400f-821c-b1bc5f360f49.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI1NzM2OTEsIm5iZiI6MTc0MjU3MzM5MSwicGF0aCI6Ii8xMjkwMjMzMjYvNDI1NTU3ODM0LTdmMjljMGNkLTljZmUtNDAwZi04MjFjLWIxYmM1ZjM2MGY0OS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMVQxNjA5NTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zZmM1OTY4YTI4M2U0ODY1MjUzYjM1YTcwYzM0ODM3NzgyNjM2YTI1MTMyY2FkMzY0MGI4YjZhMjJkMDI3NDRhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.-1NA0uhFwF8M6z0mgziyiz2KU_gaLXf8NpHqpl8J9gU",
      // Add more details as needed:
      github: "https://github.com/ozsumit/Crescentmoon",
      liveDemo: "https://cmoon.sumit.info.np",
      longDescription: "A more detailed description of the project...",
    },
    {
      id: 2,
      title: "The Repo (Odessey)",
      description:
        "This website was developed due to the sheer frustation of me not being able to find notes for technical subjects. I plan to scale it even bigger and include all subjects of all classes and be a direct competitor of sites like NepalEnotes.",
      tags: ["Next JS", "TypeScript", "Tailwind", "Aceternity Ui"],
      image:
        "https://private-user-images.githubusercontent.com/129023326/425561897-677e288b-6864-457b-9ca1-2298ba62c2e2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI1NzQxNDYsIm5iZiI6MTc0MjU3Mzg0NiwicGF0aCI6Ii8xMjkwMjMzMjYvNDI1NTYxODk3LTY3N2UyODhiLTY4NjQtNDU3Yi05Y2ExLTIyOThiYTYyYzJlMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMVQxNjE3MjZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hODY5OWRhZTZhYjkyY2I2N2Y1MGIyMmJhNTQ4OTIwYTY3ZGQ0MjhiZjQ1Mzk4YjhjYjMyYmZkMTMyZDkxOTUzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.GNIaRxAf6mZtyWn6sGq4FluL2DYhL3A36S_6LyqL1F0",
      github: "https://github.com/ozsumit/Repo-PWA",
      liveDemo: "https://repo.sumit.info.np",
    },
    {
      id: 3,
      title: "Cosmic Chicken Rhapsody",
      description: "Futuristic Space  Chicken Game that is fun to play",
      tags: ["Game", "NextJs", "Tailwind"],
      image:
        "https://private-user-images.githubusercontent.com/129023326/425566572-027453ab-109e-4a15-992f-0923d01982d0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI1NzcxODksIm5iZiI6MTc0MjU3Njg4OSwicGF0aCI6Ii8xMjkwMjMzMjYvNDI1NTY2NTcyLTAyNzQ1M2FiLTEwOWUtNGExNS05OTJmLTA5MjNkMDE5ODJkMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMVQxNzA4MDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wOWZkNmQ0ZmZhYjhiZTk3N2IwOGE1NTY0OTc2Zjc4MDIyZGZmYTAxMTgxNDE3OWQwY2Y0ZDllNDhkNDNkNGJjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.PZG1-nNZw_ATPyVAi8VF1UQ7pCclbCMQ5vRWU4WrGuY",
      github: "https://github.com/ozsumit/CosmicChickenRhapsody",
      liveDemo: "https://space.sumit.info.np",
    },
    {
      id: 4,
      title: "Library Management App",
      description:
        "A ibrary management app  built by levaraging browser's indexed db and mongodb for offline and online data storage",
      tags: ["NextJs", "TypeScript", "Tailwind", "Mistral", "MongoDB"],
      // tags: ["Three.js", "3D Modeling", "Animation"],
      image:
        "https://private-user-images.githubusercontent.com/129023326/425567573-d66164c9-1269-4059-8279-e6b54e9bf7d2.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI1NzcxMjAsIm5iZiI6MTc0MjU3NjgyMCwicGF0aCI6Ii8xMjkwMjMzMjYvNDI1NTY3NTczLWQ2NjE2NGM5LTEyNjktNDA1OS04Mjc5LWU2YjU0ZTliZjdkMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMVQxNzA3MDBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jM2E2MzhlZjMyMDUyOTBlOTJhZmFlMDdkNzFkZmFiMTYwNTIwOTQ4ZmRkZjUwMjU5OGM1ZTIzMTFhZjk4MjVjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.xuequjcXyAK5jzXN8vME3c2mbyFKQixGPPDlm5jFins",
      github: "https://github.com/ozsumit/library-management",
      liveDemo: "https://lib.sumit.info.np",
    },
    // Add more projects here following the same structure
    // {
    //   id: 5,
    //   title: "Project Title",
    //   description: "Short project description",
    //   tags: ["Tag1", "Tag2", "Tag3"],
    //   image: "/path/to/image.jpg",
    //   github: "https://github.com/yourusername/project-repo",
    //   liveDemo: "https://project-demo-url.com",
    // },
  ];

  // Define the sections in the order they should appear
  const sections = ["home", "projects", "about", "technologies", "contact"];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Unified Navigation */}
      <UnifiedNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={sections}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/30 to-black/80 z-10"></div>
          <Suspense
            fallback={<div className="absolute inset-0 bg-black"></div>}
          >
            <CityScape className="absolute inset-0 opacity-40" />
          </Suspense>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Bike Trails */}
        <BikeTrail position="top-right" size="lg" intensity="medium" />
        <BikeTrail position="bottom-left" size="md" intensity="low" />

        <div className="container relative z-20 px-4 flex flex-col items-center text-center">
          <PsychicEnergy className="absolute -z-10 opacity-30" />

          <div className="mb-6 relative">
            <EnhancedGlitchImage intensity="medium" frequency="occasional">
              <Image
                src="https://avatars.githubusercontent.com/u/129023326?v=4"
                alt="Profile"
                width={200}
                height={200}
                className="rounded-full border-4 border-red-600"
              />
            </EnhancedGlitchImage>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 glitch-text">
            <NeonText color="red">{projectInfo.author}</NeonText>
          </h1>

          <div className="space-y-4 max-w-2xl">
            <p className="text-xl md:text-2xl text-red-300 mb-8">
              DIGITAL ARCHITECT // NEO-TOKYO
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <AkiraButton
                onClick={() => {
                  const element = document.getElementById("projects");
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
                variant="primary"
              >
                VIEW PROJECTS
              </AkiraButton>
              <AkiraButton
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) {
                    window.scrollTo({
                      top: element.offsetTop - 80,
                      behavior: "smooth",
                    });
                  }
                }}
                variant="secondary"
              >
                CONTACT ME
              </AkiraButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
          <div className="text-xs text-red-400 mb-2 font-mono">SCROLL DOWN</div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </section>

      {/* Projects Section - Moved up in the order */}
      <section id="projects" className="py-20 relative">
        <div className="container px-4 mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <NeonText color="purple">PROJECTS</NeonText>
          </h2>

          <Suspense
            fallback={
              <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg border border-red-800/50"></div>
            }
          >
            <NeoTokyoShowcase projects={projects} />
          </Suspense>

          <div className="mt-16 text-center">
            <Link href="/projects">
              <AkiraButton variant="primary">VIEW ALL PROJECTS</AkiraButton>
            </Link>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* About Section - Redesigned with Neo-Tokyo theme */}
      <section
        id="about"
        className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-red-950/10"
      >
        <div className="container px-4 mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <NeonText color="red">SUBJECT PROFILE</NeonText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left column - Terminal-like interface */}
            <div className="md:col-span-7 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 opacity-30 blur-xl rounded-lg"></div>
              <div className="relative border-2 border-red-800/70 bg-black/80 p-6 rounded-lg h-full">
                {/* Terminal header */}
                <div className="flex items-center justify-between mb-4 border-b border-red-800/50 pb-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-red-500" />
                    <span className="text-red-500 font-mono text-sm">
                      SUBJECT.DATA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="font-mono text-sm space-y-4">
                  <div className="flex">
                    <span className="text-red-500 mr-2">$</span>
                    <span className="text-gray-300">
                      cat /data/subject_profile.txt
                    </span>
                  </div>

                  <div className="border-l-2 border-red-600 pl-3 py-1 mb-3">
                    <p className="text-gray-300 mb-4">{projectInfo.bio}</p>
                  </div>

                  <div className="flex">
                    <span className="text-red-500 mr-2">$</span>
                    <span className="text-gray-300">
                      cat /data/subject_skills.txt
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Skill bars with Neo-Tokyo style */}
                    {[
                      { name: "Frontend Development", level: "92%" },
                      { name: "UI/UX Design", level: "85%" },
                      { name: "3D Visualization", level: "78%" },
                      { name: "Animation", level: "88%" },
                    ].map((skill, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-red-400">
                            {skill.name}
                          </span>
                          <span className="text-xs text-blue-400">
                            {skill.level}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-red-600 to-blue-600 relative"
                            style={{
                              width: skill.level,
                              animation:
                                "skillAnimation 1.5s ease-out forwards",
                              animationDelay: `${index * 0.2}s`,
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                              <div
                                className="w-20 h-full bg-white/30 transform -skew-x-30 animate-shimmer"
                                style={{ animationDuration: "2s" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex">
                    <span className="text-red-500 mr-2">$</span>
                    <span className="text-gray-300">
                      cat /data/contact_info.txt
                    </span>
                  </div>

                  {/* Contact Information with Neo-Tokyo style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center gap-3 bg-red-900/20 p-2 rounded border border-red-800/50">
                      <Mail className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300 text-xs">
                        {projectInfo.contact.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-red-900/20 p-2 rounded border border-red-800/50">
                      <Phone className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300 text-xs">
                        {projectInfo.contact.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 bg-red-900/20 p-2 rounded border border-red-800/50 md:col-span-2">
                      <MapPin className="h-5 w-5 text-red-400" />
                      <span className="text-gray-300 text-xs">
                        {projectInfo.contact.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex">
                    <span className="text-red-500 mr-2">$</span>
                    <span className="text-gray-300">
                      ls /data/social_links/
                    </span>
                  </div>

                  <div className="flex gap-4 mt-2">
                    <AkiraButton
                      href={projectInfo.social.github}
                      variant="icon"
                      target="_blank"
                    >
                      <Github className="h-5 w-5" />
                    </AkiraButton>
                    <AkiraButton
                      href={projectInfo.social.instagram}
                      variant="icon"
                      target="_blank"
                    >
                      <Instagram className="h-5 w-5" />
                    </AkiraButton>
                    <AkiraButton
                      href={projectInfo.social.facebook}
                      variant="icon"
                      target="_blank"
                    >
                      <Facebook className="h-5 w-5" />
                    </AkiraButton>
                  </div>

                  <div className="flex items-center mt-4 pt-4 border-t border-red-800/30">
                    <span className="text-red-500 mr-2">$</span>
                    <span className="text-gray-300 animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Image and data visualization */}
            <div className="md:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-red-600 opacity-20 blur-xl rounded-lg"></div>
              <div className="relative border-2 border-red-800/70 bg-black/80 p-6 rounded-lg h-full flex flex-col">
                {/* Image with data overlay */}
                <div className="relative  bg-red-500 bg-blend-multiply mb-6 flex-grow">
                  <EnhancedGlitchImage
                    intensity="medium"
                    frequency="occasional"
                  >
                    <Image
                      src="https://private-user-images.githubusercontent.com/129023326/425575383-169552cd-8e20-4485-9860-7b982cce806f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDI1NzYyMzksIm5iZiI6MTc0MjU3NTkzOSwicGF0aCI6Ii8xMjkwMjMzMjYvNDI1NTc1MzgzLTE2OTU1MmNkLThlMjAtNDQ4NS05ODYwLTdiOTgyY2NlODA2Zi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMyMVQxNjUyMTlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1kNzU2YjIyNmIyNzU3NDRhNWI1NDcwMWI1OWQwNWMzNWNkMWM0NzM4ODJkZDBjZmQzN2JhNGM5ODQ0OWMzMGRkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.OGWko4O6l3qO8pJOLDgl4Z98AnlV8xXvMwXfQmjGCAg"
                      alt="Neo-Tokyo"
                      width={800}
                      height={600}
                      className="rounded-lg border-2  border-red-800/70 w-full h-full object-cover"
                    />
                  </EnhancedGlitchImage>

                  {/* Data overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <div className="flex justify-between">
                      <div className="text-xs font-mono text-red-400 bg-black/50 p-1 rounded">
                        ID: AK-42069
                      </div>
                      <div className="text-xs font-mono text-green-400 bg-black/50 p-1 rounded">
                        STATUS: ACTIVE
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs font-mono text-blue-400 bg-black/50 p-1 rounded">
                        SECTOR: NEO-TOKYO
                      </div>
                      <div className="text-xs font-mono text-yellow-400 bg-black/50 p-1 rounded">
                        CLEARANCE: LEVEL 5
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data visualization */}
                <div className="border-t border-red-800/50 pt-4">
                  <h3 className="text-lg font-bold text-red-400 mb-3">
                    SUBJECT ANALYSIS
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-900/20 p-3 rounded border border-red-800/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Database className="h-4 w-4 text-red-400" />
                        <span className="text-xs text-gray-300">
                          MEMORY CAPACITY
                        </span>
                      </div>
                      <div className="text-xl font-bold text-red-400">
                        18.7%
                      </div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded border border-red-800/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="h-4 w-4 text-blue-400" />
                        <span className="text-xs text-gray-300">
                          PROCESSING
                        </span>
                      </div>
                      <div className="text-xl font-bold text-blue-400">
                        30.2%
                      </div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded border border-red-800/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs text-gray-300">ENERGY</span>
                      </div>
                      <div className="text-xl font-bold text-yellow-400">
                        12.5%
                      </div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded border border-red-800/50">
                      <div className="flex items-center gap-2 mb-1">
                        <Code className="h-4 w-4 text-green-400" />
                        <span className="text-xs text-gray-300">
                          CODE QUALITY
                        </span>
                      </div>
                      <div className="text-xl font-bold text-green-400">
                        60.1%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-red-600/10 rounded-full blur-xl"></div>
        </div>

        {/* Bike Trail */}
        <BikeTrail position="bottom-right" size="sm" intensity="medium" />
      </section>

      <section id="technologies" className="py-20 relative">
        <div className="container px-4 mx-auto relative z-10">
          <Suspense
            fallback={
              <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg border border-red-800/50"></div>
            }
          >
            <TechShowcase technologies={technologies} />
          </Suspense>
        </div>

        {/* Bike Trail */}
        <BikeTrail position="right" size="lg" intensity="low" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
              <NeonText color="red">CONTACT ME</NeonText>
            </h2>

            <Suspense
              fallback={
                <div className="w-full h-[400px] bg-black/50 animate-pulse rounded-lg border border-red-800/50"></div>
              }
            >
              <DataTransmission />
            </Suspense>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-2 border-red-900/30 bg-black">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">
                {projectInfo.name}
              </h3>
              <p className="text-gray-400 text-sm">{projectInfo.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">
                NAVIGATION
              </h3>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => {
                        const element = document.getElementById(section);
                        if (element) {
                          window.scrollTo({
                            top: element.offsetTop - 80,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-red-500">CONNECT</h3>
              <div className="flex gap-4">
                <Link
                  href={projectInfo.social.github}
                  target="_blank"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href={projectInfo.social.instagram}
                  target="_blank"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href={projectInfo.social.facebook}
                  target="_blank"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                © {new Date().getFullYear()} {projectInfo.author} |{" "}
                {projectInfo.contact.address}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom PsychicEnergy icon for the tech cards
function PsychicEnergyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3C7.58172 3 4 6.58172 4 11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11C20 6.58172 16.4183 3 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 8.5L18.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.5L5.5 5.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Technology card component
function TechCard({
  title,
  icon,
  items,
  color = "red",
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  color?: "red" | "blue" | "purple" | "green";
}) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "from-blue-600 to-blue-900 border-blue-800/70 text-blue-400";
      case "purple":
        return "from-purple-600 to-purple-900 border-purple-800/70 text-purple-400";
      case "green":
        return "from-green-600 to-green-900 border-green-800/70 text-green-400";
      default:
        return "from-red-600 to-red-900 border-red-800/70 text-red-400";
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="relative">
      <div
        className="absolute -inset-2 bg-gradient-to-r opacity-30 blur-lg rounded-lg"
        style={{
          background: `linear-gradient(to right, var(--${color}-600), var(--${color}-900))`,
        }}
      ></div>
      <div
        className={`relative border-2 ${
          colorClasses.split(" ")[3]
        } bg-black/80 p-6 rounded-lg h-full`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`${colorClasses.split(" ")[4]}`}>{icon}</div>
          <h3 className={`text-xl font-bold ${colorClasses.split(" ")[4]}`}>
            {title}
          </h3>
        </div>

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  colorClasses.split(" ")[4]
                }`}
              ></div>
              <span className="text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
