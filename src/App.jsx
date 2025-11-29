import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Properties from './pages/Properties';
import Users from './pages/Users';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/properties"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <Properties />
            </AdminLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <Settings />
            </AdminLayout>
            // </ProtectedRoute>
          }
        />

        {/* Add other admin pages later */}
      </Routes>
    </Router>
  );
}
