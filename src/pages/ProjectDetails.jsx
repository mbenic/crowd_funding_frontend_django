
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from '../config.js';
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 


  const fetchProject = async () => {
    const res = await fetch(`${API_URL}/api/projects/${id}/`);
    if (res.ok) {
      const data = await res.json();
      setProject(data);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  
//  const isOwner = user?.id === project?.owner?.id;
  const isOwner = user && project && user.user_id === project.owner;

  if (!project) return <p className="text-center mt-20">Loading...</p>;

  const defaultImage = '/images/default.png';

  const getImageUrl = (image) => {
    if (!image) return defaultImage;
    if (image.startsWith('http')) return image;
    return defaultImage;
  };

  const calculatePledgeProgress = () => {
    if (!project?.pledges || !project?.goal) return 0;

    const totalPledges = project.pledges.reduce(
      (sum, pledge) => sum + (Number(pledge.amount) || 0),
      0
    );

    return Math.min((totalPledges / project.goal) * 100, 100);
  };

  // 🔥 PLEDGE SUBMIT FUNCTION
  const handlePledgeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/projects/${id}/pledges/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
            Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });

      const data = await res.json();
      //console.log("RESPONSE:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit pledge");
      }

      setAmount("");
      await fetchProject(); // Refresh project data

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        {project.title}
      </h1>

      <img
        src={getImageUrl(project.image)}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p className="text-gray-700 mb-4">{project.description}</p>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-indigo-500 to-pink-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${calculatePledgeProgress()}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {project.pledges?.length || 0} contributions •{" "}
          {Math.round(calculatePledgeProgress())}% of ${project.goal} goal
        </p>
      </div>

      <p className="text-gray-500 text-sm mb-8">
        Goal: ${project.goal.toLocaleString()}
      </p>

      {project.is_open ? (
        <> 
        <p className="text-green-600 font-semibold mb-6">This project is open for pledges!</p>
        {/* 🔐 PLEDGE FORM (Only Logged In Users) */}
      {user && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">
            Make a Pledge
          </h2>

          <form onSubmit={handlePledgeSubmit} className="space-y-4">
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter pledge amount"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Submitting..." : "Submit Pledge"}
            </button>
          </form>
        </div>
      )}

      {/* 🚫 Not Logged In Message */}
      {!user && (
        <p className="text-center text-gray-500 mt-6">
          Please log in to make a pledge.
        </p>
      )}
    </>
      ) : (
        <p className="text-red-600 font-semibold mb-6">This project is closed for pledges.</p>
      )}
      
 {isOwner && (
       <div  className="w-full bg-sky-600 text-white py-3 mt-10 rounded-lg hover:bg-sky-700 transition">
     
     
        <Link
          to={`/projects/${project.id}/edit`}
        >
          Edit Project
        </Link>
  
    </div>

    
    )}
    </div>
  );
}