import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setUser, setToken } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          username: form.name,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
          password_confirmation: form.confirm_password,
        }),
      });

      const data = await res.json();

      login({
          username: data.username,
          user_id: data.user_id,
        }, data.token); // same as login flow
        
      navigate("/"); // redirect to home

      // if (!res.ok) {
      //   throw new Error(data.message || "Registration failed");
      // }

      if (!res.ok) {
  console.log(data); // 👈 See full response in console
   

  if (data.error) {
    const firstError = Object.values(data.error)[0][0];
    throw new Error(firstError);
  }

  throw new Error(data.message || "Registration failed");
}

      // ✅ Save token + user in context
      setToken(data.token);
      setUser(data.user);

      // Optional: store in localStorage
      localStorage.setItem("token", data.token);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
        Create Account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          type="text"
          placeholder="Username"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="first_name"
          type="text"
          placeholder="First Name"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="last_name"
          type="text"
          placeholder="Last Name"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </form>
    </div>
  );
}