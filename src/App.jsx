import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AuthCallback from "./AuthCallback";
import SignupOptions from "./Pages/SignupOptions";
import LoginPage from "./pages/LoginPage.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import QuotePage from "./pages/QuotePage.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
// import ChatBotPage from "./pages/ChatbotWidget.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupOptions />} />
        <Route path="/signup/form" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path="/bot" element={<ChatBotPage />} /> */}
        <Route
          path="/quote"
          element={
            <ProtectedRoute>
              <QuotePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
