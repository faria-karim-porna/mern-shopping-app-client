import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/Signup";
import { Dashboard } from "./components/pages/Dashboard";
import { AddUserModal } from "./components/modals/AddUserModal";
import { ResetPassword } from "./components/pages/ResetPassword";
import { EditUserModal } from "./components/modals/EditUserModal";
import { AddItemModal } from "./components/modals/AddItemModal";
import { EditItemModal } from "./components/modals/EditItemModal";
import { EditPersonalInfoModal } from "./components/modals/EditPersonalInfoModal";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <AddUserModal />
      <EditUserModal />
      <AddItemModal />
      <EditItemModal />
      <EditPersonalInfoModal />
    </>
  );
}
