import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, isAdmin ? role : undefined);
      toast.success("Registration success");
      console.log("rolerrrr", role);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Register</h2>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Register as Admin
        </label>

        {isAdmin && (
          <>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </>
        )}

        <button className="btn">
          {loading ? <FaSpinner className="spinner" /> : "Register"}
        </button>

        <div className="muted">
          Already have account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
