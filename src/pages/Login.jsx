import LoginForm from "../components/LoginForm";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  const { error } = location.state || { error: null };
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };
  useEffect(() => {
    if (error) {
      alert(error);
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 lg:px-32 sm:px-16 px-8">
      <div className="hidden flex flex-col mr-auto md:block">
        <h1 className="text-5xl font-bold text-indigo-500 mb-4">Shopify</h1>
        <p>Sell, buy and deliver - All in one place</p>
      </div>
      {isLogin ? (
        <LoginForm onToggle={toggleForm} />
      ) : (
        <SignUpForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Login;
