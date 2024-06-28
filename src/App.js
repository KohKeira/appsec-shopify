import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import AppContext from "./AppContext";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/protectedPages/Admin"));
const Customer = lazy(() => import("./pages/protectedPages/Customer"));
const Courier = lazy(() => import("./pages/protectedPages/Courier"));
const Seller = lazy(() => import("./pages/protectedPages/Seller"));
const Home = lazy(() => import("./pages/Home"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/seller" element={<Seller />} />
              <Route path="/courier" element={<Courier />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
