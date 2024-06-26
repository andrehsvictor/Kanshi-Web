import { BackgroundImage } from "./components/BackgroundImage";
import bg from "../../assets/bg.jpg";
import Overlay from "./components/Overlay";
import GradientOverlay from "./components/GradientOverlay";
import LoginForm from "./components/LoginForm";
import useLogin from "../../hooks/useLogin";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useLogin();
  const [error, setError] = useState<string | null>(null);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.success) {
      alert("Login successful");
      navigate("/home");
    } else {
      setError(response.message || "Could not log in");
      setIsErrorMessageVisible(true);
    }
  };

  return (
    <>
      <BackgroundImage bg={bg} />
      <Overlay />
      <GradientOverlay />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] bg-white p-4 rounded-lg sm:max-w-sm">
        <h1 className="text-2xl text-center font-bold">Welcome to Kanshi!</h1>
        <p className="text-center text-gray-500 mb-4">
          Please log in to continue
        </p>
        <LoginForm onLogin={handleLogin} />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-center text-sm">
        <p>&copy; 2024 Kanshi. All rights reserved.</p>
      </div>
      <div className="absolute bottom-4 right-4 text-white text-center">
        <a href="#" className="text-white">
          About
        </a>
      </div>
      <ErrorMessage
        open={isErrorMessageVisible}
        message={error || ""}
        onDismiss={() => setIsErrorMessageVisible(false)}
      />
    </>
  );
};

export default LoginPage;
