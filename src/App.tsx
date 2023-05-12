import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/Signup";
import { Dashboard } from "./components/pages/Dashboard";
import { UserModal } from "./components/modals/UserModal";
import { ResetPassword } from "./components/pages/ResetPassword";
import { GlassmorphismBackground } from "./components/common/GlassMorphismBackground";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/gmbg" element={<GlassmorphismBackground />} />
        </Routes>
      </Router>
      <UserModal />
    </>
  );
}
