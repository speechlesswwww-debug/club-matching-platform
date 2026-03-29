import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { IdentityPage } from "./pages/IdentityPage";
import { StudentLoginPage } from "./pages/StudentLoginPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { StudentHomePage } from "./pages/StudentHomePage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { RecommendationsPage } from "./pages/RecommendationsPage";
import { ClubDetailPage } from "./pages/ClubDetailPage";
import { ApplyPage } from "./pages/ApplyPage";
import { ApplicationsPage } from "./pages/ApplicationsPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<IdentityPage />} />
        <Route path="/student/login" element={<StudentLoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/assessment" element={<AssessmentPage />} />
        <Route path="/student/recommendations" element={<RecommendationsPage />} />
        <Route path="/student/club/:id" element={<ClubDetailPage />} />
        <Route path="/student/apply/:clubId" element={<ApplyPage />} />
        <Route path="/student/applications" element={<ApplicationsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
