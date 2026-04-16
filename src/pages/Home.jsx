import ProjectCard from "../components/ProjectCard";

import { useEffect, useState,useContext } from "react";
import { API_URL } from '../config.js';

import { AuthContext } from "../context/AuthContext";

export  function Home() {
  const [projects, setProjects] = useState([]);
  const { user, token } = useContext(AuthContext);

 

  const fetchProject = async () => {
      const res = await fetch(`${API_URL}/api/projects/`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    };
  
useEffect(() => {
  fetchProject();
}, []);
  
    if (projects.length === 0) return <p className="text-center mt-20">Loading...</p>;
  
    
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