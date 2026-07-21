import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import ReflectionPage from './pages/ReflectionPage'
import ThankYouPage from './pages/ThankYouPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminResponsePage from './pages/admin/AdminResponsePage'

export default function App() {
  return (
    <Routes>
      <Route path="/"                      element={<LandingPage />} />
      <Route path="/about"                 element={<AboutPage />} />
      <Route path="/reflection"            element={<ReflectionPage />} />
      <Route path="/thank-you"             element={<ThankYouPage />} />
      <Route path="/admin/login"           element={<AdminLoginPage />} />
      <Route path="/admin/dashboard"       element={<AdminDashboardPage />} />
      <Route path="/admin/response/:id"    element={<AdminResponsePage />} />
      <Route path="*"                      element={<Navigate to="/" replace />} />
    </Routes>
  )
}
