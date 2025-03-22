import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "../../../components/ui/button";
import NeonText from "../../../components/neon-text";
import GlitchImage from "../../../components/glitch-image";
import PsychicEnergy from "../../../components/psychic-energy";

interface ProjectPageProps {
  params: {
    id: string;
  };
}

// This would typically come from a database or API
// In a production app, you would fetch this data from an API endpoint
export async function generateStaticParams() {
  // Pre-generate pages for projects with IDs 1-4
  return [1, 2, 3, 4].map((id) => ({ id: id.toString() }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const projectId = Number.parseInt(params.id);

  // Simulate fetching project data
  // In a real application, this would be an API call or database query
  const project = {
    id: projectId,
    title:
      projectId === 1
        ? "Neo-Tokyo"
        : projectId === 2
        ? "Psychic Energy"
        : projectId === 3
        ? "Capsule Corp"
        : projectId === 4
        ? "Kaneda's Bike"
        : "Project",
    description:
      "A dystopian cityscape visualization using WebGL and Three.js, inspired by the iconic Neo-Tokyo from Akira. This project explores the intersection of technology and human consciousness through interactive digital art.",
    longDescription: `In the sprawling cyber metropolis of Neo-Tokyo, I crafted a digital experience that pushes the boundaries of reality. This project explores the intersection of technology and human consciousness through interactive digital art.

The visualization uses advanced WebGL techniques to create a living, breathing cityscape that responds to user interaction. The neon-lit buildings and atmospheric effects are all procedurally generated, creating a unique experience with each visit.

Like the awakening of untapped power in Akira, this project transforms simple code into a digital manifestation that challenges perception and convention.`,
    tags: ["Three.js", "WebGL", "React", "Animation", "Procedural Generation"],
    image: `/placeholder.svg?height=600&width=800&text=Project-${projectId}`,
    gallery: [
      `/placeholder.svg?height=400&width=600&text=Screenshot-1`,
      `/placeholder.svg?height=400&width=600&text=Screenshot-2`,
      `/placeholder.svg?height=400&width=600&text=Screenshot-3`,
    ],
    technologies: [
      {
        name: "React",
        description: "Frontend framework for building the user interface",
      },
      {
        name: "Three.js",
        description:
          "3D library for creating and displaying 3D computer graphics",
      },
      {
        name: "WebGL",
        description:
          "JavaScript API for rendering interactive 2D and 3D graphics",
      },
      {
        name: "GLSL",
        description: "Shading language for creating custom visual effects",
      },
    ],
    features: [
      "Procedurally generated cityscape with dynamic lighting",
      "Interactive camera controls with smooth animations",
      "Custom shader effects inspired by Akira's visual style",
      "Responsive design that works across devices",
      "Optimized performance using instanced rendering",
    ],
    github: "https://github.com/ozsumit",
    liveDemo: "#",
  };

  // Add console log to verify the project data is being loaded correctly
  console.log(`Loading project ${projectId}: ${project.title}`);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative py-12 overflow-hidden border-b border-red-900/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <PsychicEnergy />
        </div>
        <div className="container px-4 mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <Link href="/projects">
              <Button
                variant="outline"
                size="sm"
                className="border-red-600 text-red-400 hover:bg-red-900/20"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Project Hero */}
      <section className="relative py-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <NeonText color="red">{project.title}</NeonText>
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-red-900/30 text-red-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-300 mb-8">{project.description}</p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Link href={project.liveDemo} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/20"
                >
                  <Link href={project.github} target="_blank">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-blue-600 opacity-20 blur-xl rounded-lg"></div>
              <GlitchImage intensity="medium">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="rounded-lg border border-red-800/50 w-full object-cover"
                />
              </GlitchImage>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 relative bg-gradient-to-b from-black to-red-950/20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6">
                <NeonText color="blue">PROJECT OVERVIEW</NeonText>
              </h2>

              <div className="prose prose-invert max-w-none">
                {project.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              <h3 className="text-2xl font-bold mt-12 mb-6">
                <NeonText color="purple">KEY FEATURES</NeonText>
              </h3>

              <ul className="space-y-4">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-2">⟩</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-red-600 opacity-10 blur-xl rounded-lg"></div>
                <div className="relative border border-red-800/50 bg-black/80 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">
                    <NeonText color="red">TECHNOLOGIES</NeonText>
                  </h3>

                  <ul className="space-y-4">
                    {project.technologies.map((tech, i) => (
                      <li key={i} className="border-b border-red-900/30 pb-3">
                        <h4 className="font-bold text-red-400">{tech.name}</h4>
                        <p className="text-sm text-gray-400">
                          {tech.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 relative">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <NeonText color="blue">PROJECT GALLERY</NeonText>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg"
              >
                <GlitchImage intensity="low">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </GlitchImage>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
