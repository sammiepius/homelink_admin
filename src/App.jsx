import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<Dashboard />} />
        {/* 
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        /> */}

        {/* Add other admin pages later */}
      </Routes>
    </Router>
  );
}
