import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Properties from './pages/Properties';
import Users from './pages/Users';
import Settings from './pages/Settings';
import ApprovalsPage from './pages/ApprovalPage';
import PropertyDetails from './pages/PropertyDetails';
import AdminAuditLogs from './pages/AuditLogs';
import RecentActivities from './components/dashboardStats/RecentActivities';

export default function App() {
  return (
    <Router>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/activity/audit" element={<AdminAuditLogs />} />
        <Route path="/activity/recent" element={<RecentActivities />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/properties"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <Properties />
            </AdminLayout>
            // </ProtectedRoute>
          }
        /> */}
        <Route
          path="/properties"
          element={
            // <ProtectedRoute>
            <AdminLayout>
              <ApprovalsPage />
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
