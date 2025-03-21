import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import NeonText from "@/components/neon-text";
import GlitchImage from "@/components/glitch-image";
import PsychicEnergy from "@/components/psychic-energy";

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Neo-Tokyo",
      description:
        "A dystopian cityscape visualization using WebGL and Three.js",
      tags: ["Three.js", "WebGL", "React"],
      image: "/placeholder.svg?height=600&width=800&text=Neo-Tokyo",
      featured: true,
    },
    {
      id: 2,
      title: "Psychic Energy",
      description: "Interactive particle system inspired by Tetsuo's powers",
      tags: ["Canvas", "JavaScript", "Animation"],
      image: "/placeholder.svg?height=600&width=800&text=Psychic-Energy",
      featured: true,
    },
    {
      id: 3,
      title: "Capsule Corp",
      description: "Futuristic UI components for cyberpunk interfaces",
      tags: ["UI/UX", "React", "Tailwind"],
      image: "/placeholder.svg?height=600&width=800&text=Capsule-Corp",
      featured: false,
    },
    {
      id: 4,
      title: "Kaneda's Bike",
      description: "3D model and animation of the iconic motorcycle",
      tags: ["Three.js", "3D Modeling", "Animation"],
      image: "/placeholder.svg?height=600&width=800&text=Kaneda-Bike",
      featured: true,
    },
    {
      id: 5,
      title: "Esper Project",
      description:
        "Experimental audio visualization inspired by psychic powers",
      tags: ["Web Audio API", "Canvas", "React"],
      image: "/placeholder.svg?height=600&width=800&text=Esper-Project",
      featured: false,
    },
    {
      id: 6,
      title: "SOL Terminal",
      description: "Retro-futuristic terminal interface with glitch effects",
      tags: ["TypeScript", "React", "Animation"],
      image: "/placeholder.svg?height=600&width=800&text=SOL-Terminal",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative py-12 overflow-hidden border-b border-red-900/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <PsychicEnergy />
        </div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <NeonText color="red">PROJECT ARCHIVES</NeonText>
            </h1>
            <p className="text-xl text-red-300 max-w-2xl mx-auto">
              Experimental digital creations from the depths of Neo-Tokyo
            </p>
          </div>
        </div>
      </header>

      {/* Featured Projects */}
      <section className="py-16 relative">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <NeonText color="blue">FEATURED EXPERIMENTS</NeonText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((project) => project.featured)
              .map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 relative bg-gradient-to-b from-black to-red-950/20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            <NeonText color="purple">ALL EXPERIMENTS</NeonText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    featured?: boolean;
  };
  featured?: boolean;
}

function ProjectCard({ project, featured }: ProjectCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-lg transition-all duration-500 hover:scale-[1.02] ${
        featured ? "ring-2 ring-red-600/50 ring-offset-2 ring-offset-black" : ""
      }`}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 opacity-30 blur-sm rounded-lg group-hover:opacity-50 transition-all duration-500"></div>
      <div className="relative border border-red-800/50 bg-black/80 overflow-hidden rounded-lg">
        <div className="relative h-60 overflow-hidden">
          <GlitchImage>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />
          </GlitchImage>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-red-400">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-red-900/30 text-red-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/projects/${project.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-red-600 text-red-400 hover:bg-red-900/20"
            >
              VIEW DETAILS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
