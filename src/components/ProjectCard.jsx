import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  

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


    const calculateAmount = () => {
      if (!project?.pledges || !project?.goal) return 0;
  
      const totalAmount = project.pledges.reduce(
        (sum, pledge) => sum + (Number(pledge.amount) || 0),
        0
      );
  
      return totalAmount;
    };




  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
      <img
        src={getImageUrl(project.image)}
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
              style={{ width: `${calculatePledgeProgress()}%` }}
            />
          </div>
          <div className="flex justify-between text-sm mt-2 text-gray-600">
            {/* <span>${project.amount} raised</span> */}
            <span>${calculateAmount()} raised</span>
            <span>{calculatePledgeProgress().toFixed(2)}% of goal</span>
         
          </div>
        </div>

       
        <Link to={`/projects/${project.id}`}>
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          View Project
        </button>
      </Link>
      </div>
    </div>
  );
}