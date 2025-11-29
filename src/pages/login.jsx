import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // try {
    //   const res = await axios.post('http://localhost:5000/api/admin/login', {
    //     email,
    //     password,
    //   });

    //   localStorage.setItem('adminToken', res.data.token);
    navigate('/dashboard');
    // } catch (err) {
    //   alert('Login failed');
    // }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-8 w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full border px-3 py-2 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Login
        </button>
      </form>
    </div>
  );
}
