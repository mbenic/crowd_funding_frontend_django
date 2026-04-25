import { useState, useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";
import { Navigate } from "react-router-dom";

export default function CreateProject() {
  const { user, token } = useContext(AuthContext);
  

  const [form, setForm] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
  });

  
  const [loading, setLoading] = useState(false);

  

  if (user === null) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" />;


 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      return alert("You must be logged in to create a project");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/projects/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${token}`,
          Accept: "application/json",
         
           Authorization: `Token ${token}`,
 
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        // Redirect to the newly created project page
        navigate(`/projects/${data.id}`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create project");
      }
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      <h1 className="text-3xl font-bold mb-6">Create Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full border p-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          placeholder="Goal"
          type="number"
          className="w-full border p-3 rounded"
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          required
        />
        <input
          placeholder="Image URL"
          type="text"
          className="w-full border p-3 rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}