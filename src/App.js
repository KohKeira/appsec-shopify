import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import AppContext from "./AppContext";
import Admin from "./pages/protectedPages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Customer from "./pages/protectedPages/Customer";
import Seller from "./pages/protectedPages/Seller";
import Courier from "./pages/protectedPages/Courier";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/courier" element={<Courier />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
