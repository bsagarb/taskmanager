import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login Success");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card" onSubmit={submit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
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
        <button className="btn">
          {loading ? <FaSpinner className="spinner" /> : "Login"}
        </button>
        <div className="muted">
          Don't have account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}
