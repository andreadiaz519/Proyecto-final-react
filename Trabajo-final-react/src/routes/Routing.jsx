import { Route, Routes } from "react-router-dom";
import { Register } from "../components/Register";
import { Login } from "../pages/auth/Login";
import { Create } from "../pages/auth/Create";  // Asegúrate de que la ruta sea correcta
import Home from "../pages/Home";


export default function Routing() {
  return (<>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create />} />  
    </Routes>
    </>
  );
}
