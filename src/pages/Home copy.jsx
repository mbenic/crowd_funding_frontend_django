import ProjectCard from "../components/ProjectCard";

export  function Home() {

  const projects = [
    {
      id: 1,
      title: "Smart Water Bottle",
      description: "Tracks hydration and reminds you to drink water.",
      raised: 12500,
      goal: 20000,
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 2,
      title: "Eco Backpack",
      description: "Sustainable materials built for explorers.",
      raised: 8300,
      goal: 15000,
      image: "https://via.placeholder.com/400x250"
    },
    {
      id: 3,
      title: "Indie Game Launch",
      description: "A nostalgic RPG adventure.",
      raised: 21000,
      goal: 30000,
      image: "https://via.placeholder.com/400x250"
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Fund the Future
        </h1>
        <p className="mt-4 text-gray-600">
          Support innovative ideas from creators around the world.
        </p>
      </section>

      {/* Projects */}
      <section className="pb-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">
          Current Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}