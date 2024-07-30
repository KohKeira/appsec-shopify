import LoginForm from "../components/LoginForm";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import OTPForm from "../components/OTPForm";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTPForm, setShowOTPForm] = useState(false);

  const location = useLocation();

  const { error, reset } = location.state || { error: null, reset: false };
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  const toggleOTPForm = () => {
    setShowOTPForm((prev) => !prev);
  };
  useEffect(() => {
    if (error) {
      alert(error);
      location.state.error = null;
    }
    if (reset) {
      setShowOTPForm(false);
      location.state.reset = false;
    }
  }, [location, error, reset]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 lg:px-32 sm:px-16 px-8 pt-24 pb-4">
      <div className="hidden flex flex-col mr-auto md:block">
        <h1 className="text-5xl font-bold text-indigo-500 mb-4">Shopify</h1>
        <p>Sell, buy and deliver - All in one place</p>
      </div>
      {showOTPForm ? (
        <OTPForm toggleOTPForm={toggleOTPForm} />
      ) : isLogin ? (
        <LoginForm onToggle={toggleForm} toggleOTPForm={toggleOTPForm} />
      ) : (
        <SignUpForm onToggle={toggleForm} />
      )}
    </div>
  );
};

export default Login;
