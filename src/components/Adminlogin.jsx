import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || 'Login failed'); // use `msg` from backend
    }

    // ✅ Check role from data.user.role
    if (data.user.role !== 'admin') {
      setError('Access denied: Only admins can log in');
      return;
    }

    login(data.user, data.token);
    navigate('/admin', { replace: true });
  } catch (err) {
    setError(err.message || 'An error occurred during login');
  }
};


  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Right Section */}
      <div className="right md:w-1/2 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Admin Panel</h1>
        <div className="login-box bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;