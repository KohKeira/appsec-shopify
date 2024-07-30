import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, Suspense, lazy, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AppContext from "./AppContext";
import Loading from "./components/Loading";
import ErrorFallback from "./components/ErrorFallback";
import { Navbar } from "./components/Navbar";
import axios from "axios";

const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/protectedPages/admin/Admin"));
const Customer = lazy(() => import("./pages/protectedPages/Customer"));
const Courier = lazy(() => import("./pages/protectedPages/Courier"));
const Seller = lazy(() => import("./pages/protectedPages/seller/Seller"));
const Home = lazy(() => import("./pages/Home"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const Product = lazy(() => import("./pages/Product"));
const CreateProduct = lazy(() =>
  import("./pages/protectedPages/seller/CreateProduct")
);
const EditProduct = lazy(() =>
  import("./pages/protectedPages/seller/EditProduct")
);
const CreateUser = lazy(() =>
  import("./pages/protectedPages/admin/CreateUser")
);

const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(sessionStorage.getItem("token") || null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
    }
    if (token && !user) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_API}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log("fetching user data");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [token, user]);

  if (loading) return <Loading />;

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setUser();
          }}
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route element={<ProtectedRoute role="admin" />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/user" element={<CreateUser />} />
              </Route>
              <Route element={<ProtectedRoute role="customer" />}>
                <Route path="/customer" element={<Customer />} />
              </Route>
              <Route element={<ProtectedRoute role="courier" />}>
                <Route path="/courier" element={<Courier />} />
              </Route>
              <Route element={<ProtectedRoute role="seller" />}>
                <Route path="/seller" element={<Seller />} />
                <Route path="/seller/product" element={<CreateProduct />} />
                <Route path="/seller/product/:id" element={<EditProduct />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
