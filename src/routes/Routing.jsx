import { Route, Routes } from "react-router-dom";
import { Register } from "../components/Register";
import { Login } from "../pages/auth/Login";
import { Create } from "../pages/auth/Create"; 
import Home from "../pages/Home";
import MyProfile from "../components/MyProfile";
import CartDetails from "../components/CartDetails";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-profile" element={<MyProfile />} />
      <Route path="/create" element={<Create />} />
      <Route path="/productos/:id" element={<CartDetails />} />  {/* Ruta dinámica */}
    </Routes>
  );
}
