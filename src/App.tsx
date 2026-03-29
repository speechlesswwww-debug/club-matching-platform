import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IdentitySelect from './pages/IdentitySelect'
import StudentLogin from './pages/StudentLogin'
import AdminLogin from './pages/AdminLogin'
import StudentHome from './pages/StudentHome'
import Assessment from './pages/Assessment'
import Recommendations from './pages/Recommendations'
import ClubDetail from './pages/ClubDetail'
import Apply from './pages/Apply'
import Applications from './pages/Applications'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IdentitySelect />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/assessment" element={<Assessment />} />
        <Route path="/student/recommendations" element={<Recommendations />} />
        <Route path="/student/club/:id" element={<ClubDetail />} />
        <Route path="/student/apply/:clubId" element={<Apply />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
