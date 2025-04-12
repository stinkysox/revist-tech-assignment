import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:4000/api/users/login"
      : "http://localhost:4000/api/users/register";

    const body = {
      username: isLogin ? undefined : username,
      email,
      password,
    };

    try {
      const response = await axios.post(url, body);

      // Accept both 200 (login) and 201 (register)
      if (response.status === 200 || response.status === 201) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token); // Save token
        }
        navigate("/"); // Redirect to homepage
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <h1>🛒 FastCart</h1>
        <p>Welcome to the future of shopping</p>
      </div>

      <div className="auth-card">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p onClick={toggleForm} className="toggle-text">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
