import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Please enter email and password');
        setLoading(false);
        return;
      }

      const res = await axios.post(
        'http://localhost:5000/api/auth/adminlogin',
        { email, password }
      );

      const { token, user } = res.data;

      if (!token || !user) {
        toast.error('Invalid server response');
        setLoading(false);
        return;
      }

      if (user.role !== 'ADMIN') {
        toast.error('Access denied. Admins only.');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(user));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
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
