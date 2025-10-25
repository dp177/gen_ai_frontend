import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotebookPage from "./pages/NotebookPage";
import FindLawyer from "./pages/FindLawyer";
import LawyerOnboard from "./pages/LawyerOnboard";
import LawyerRequests from "./pages/LawyerRequests";
import ChatView from "./pages/ChatView";
import MyClients from "./pages/MyClients";
import CompleteRegistration from './pages/CompleteRegistration';
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./Axios/axios";
import useAuthStore from "./context/AuthContext";
import AuthCallback from "./pages/AuthCallback";
import { applyPalette, defaultPalette } from './utils/palette';
import Layout from "./components/Layout";

function App() {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const [theme] = useState("light");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) return;
        const resp = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resp.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token, setUser]);

  useEffect(() => {
    applyPalette(defaultPalette);
  }, [theme]);

  return (
    <Router>
      <div className="app-root min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/legaldesk/:id" element={<NotebookPage />} />
                    <Route path="/find-lawyer" element={<FindLawyer />} />
                    <Route path="/onboard-lawyer" element={<LawyerOnboard />} />
                    <Route path="/complete-registration" element={<CompleteRegistration />} />
                    <Route path="/lawyer/requests" element={<LawyerRequests />} />
                    <Route path="/mylawyers" element={<MyClients />} />
                    <Route path="/chat/:id" element={<ChatView />} />
                    <Route path="*" element={<Navigate to={'/home'} />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;