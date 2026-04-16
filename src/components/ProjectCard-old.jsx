import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {

  const percentage = Math.min(
    Math.round((project.raised / project.goal) * 100),
    100
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            <span>${project.raised.toLocaleString()} raised</span>
            <span>{percentage}%</span>
          </div>
        </div>

        {/* <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          View Project
        </button> */}

        <Link to={`/projects/${project.id}`}>
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          View Project
        </button>
      </Link>
      </div>
    </div>
  );
}