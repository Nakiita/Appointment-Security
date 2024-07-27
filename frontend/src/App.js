import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/User/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditDoctor from "./pages/admin/AdminEditDoctor";
import AdminView from "./pages/admin/AdminView";
import UserDashboard from "./pages/User/UserDashboard";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Details from "./pages/User/Details";
import Success from "./pages/User/Success";
import Appoinments from "./pages/admin/Appoinments";
import Users from "./pages/admin/Users";
import AdminRoutes from "./pages/protected_routes/AdminRoutes";
import UserRoutes from "./pages/protected_routes/UserRoutes";
import EmergencyContacts from "./pages/User/EmergencyContacts";
import Footer from "./components/Footer";
import UserProfile from "./pages/User/UserProfile";


function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/password/reset/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/user-profile" element={<UserProfile />}></Route>
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/admin/edit/:id" element={<AdminEditDoctor />} />
        <Route path="/admin/view/:id" element={<AdminView />} />
        <Route path="/admin/appointments" element={<Appoinments />} />
        <Route path="/admin/users" element={<Users />} />

        <Route path="/sidebar" element={<Sidebar />} />

        <Route element={<UserRoutes />}>
          <Route path="/homepage" element={<Homepage />} />
        </Route>

        <Route path="/" element={<UserDashboard />} />

        <Route path="/details/:id" element={<Details />} />

        <Route path="/navbar" element={<Navbar />} />
        <Route path="/success" element={<Success />} />
        <Route path="/emergency" element={<EmergencyContacts />} />

        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
    
  );
}
export default App;
