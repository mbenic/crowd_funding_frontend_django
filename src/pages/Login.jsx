// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const { setToken, setUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       if (res.ok) {
//         const data = await res.json();

//         // Save token and user directly from response
//         setToken(data.data.token);
//         setUser(data.data.user);

//         navigate("/create-project");
//       } else {
//         const errorData = await res.json();
//         alert(errorData.message || "Login failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed. Check console for details.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-20 space-y-4 p-6 border rounded shadow-md bg-white"
//     >
//       <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

//       <input
//         type="email"
//         placeholder="Email"
//         autoComplete="username"
//         className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//         required
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         autoComplete="current-password"
//         className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//         required
//       />

//       <button
//         type="submit"
//         className={`w-full p-3 rounded text-white ${
//           loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
//         }`}
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>
//     </form>
//   );
// }


// Login.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config.js';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("API_URL:", API_URL); 
    
    const res = await fetch(`${API_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      // Save user & token in context
      //login(data.username, data.token); // <--- important

      login({
          username: data.username,
          user_id: data.user_id,
        }, data.token);

      navigate("/");
    } else {
      alert("Login failed");
    }
    setLoading(false);
  };

 return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4 p-6 border rounded shadow-md bg-white"
    >
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

      <input
        // type="email"
        placeholder="Username"
        autoComplete="username"
        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button
        type="submit"
        className={`w-full p-3 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}