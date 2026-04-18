import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { API_URL } from '../config.js';

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
   
    is_open: true,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Fetch project data
  useEffect(() => {
    fetch(`${API_URL}/api/projects/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setLoading(false);
      });
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/projects/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
             Authorization: `Token ${token}`,
          },
          body: JSON.stringify(project),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        return;
      }

      navigate(`/projects/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="space-y-1">
        <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 text-left"
        >
            Project Title
        </label>

        <input
            id="title"
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        </div>
        {errors.title && <p className="text-red-500">{errors.title}</p>}



         <div className="space-y-1">
        <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 text-left"
        >
          Description
        </label>
        <textarea
        label="Description"
          name="description"
          value={project.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        </div>
        {errors.description && <p className="text-red-500">{errors.description}</p>}

         <div className="space-y-1">
        <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 text-left"
        >
            Goal
        </label>
        <input
        label="Goal"
          type="number"
          name="goal"
          value={project.goal}
          onChange={handleChange}
          placeholder="Funding Goal"
          className="w-full p-2 border rounded"
        />
        </div>
        {errors.goal && <p className="text-red-500">{errors.goal}</p>}

         <div className="space-y-1">
        <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 text-left"
        >
           Image Url
        </label>
        <input
        label="Image URL"
          type="text"
          name="image"
          value={project.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        </div>
        {errors.image && <p className="text-red-500">{errors.image}</p>}
        <label className="flex items-center space-x-2">
          <input
          label="Open for Funding"
            type="checkbox"
            name="is_open"
            checked={project.is_open}
            onChange={handleChange}
          />
          <span>Open for Funding</span>
        </label>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Project
        </button>
        <Link to={`/projects/${id}`} className="ml-4 text-gray-600 hover:text-gray-800 border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
          Cancel
        </Link>
      </form>
    </div>
  );
}