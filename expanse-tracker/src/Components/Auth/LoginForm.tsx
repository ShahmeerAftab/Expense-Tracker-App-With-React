import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../../supabaseClient";
import InputField from "./AuthUIComponents/Input";
import Button from "./AuthUIComponents/AuthButton";
import Heading from "./AuthUIComponents/Heading";
import Tabs from "./AuthUIComponents/Tabs";

interface FormDataType {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    // Supabase logic
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(`Login error ${error}`);
    } else {
      alert(`Login successful`);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    }
  };

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={submitHandle}>
      <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 min-h-screen flex justify-center items-center animate-fadeIn px-4">
        <div className="bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400 w-full max-w-[400px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px] min-h-[460px] sm:min-h-[480px] md:min-h-[500px] rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
          {/* Title */}
          <Heading label="Login Form" />

          {/* Tabs */}
          <div className="flex justify-center mt-6 w-full">
            <Tabs active="login" onTabChange={(tab) => navigate(`/${tab}`)} />
          </div>

          {/* Inputs */}
          <div className="flex flex-col justify-center items-center w-full mt-6 gap-4 px-3 sm:px-0">
            <InputField
              type="text"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={changeHandle}
            />
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandle}
            />
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-2 sm:mt-3">
            <p
              onClick={() => navigate("/forgotPage")}
              className="text-green-700 cursor-pointer hover:underline hover:text-green-800 transition-all duration-300 text-sm sm:text-base"
            >
              Forgot Password?
            </p>
          </div>

          {/* Login Button */}
          <div className="flex justify-center mt-4 px-3 sm:px-0">
            <Button type="submit" label="login" />
          </div>

          {/* Signup Text */}
          <div className="flex justify-center pt-6">
            <p className="text-white text-sm sm:text-base">
              Not a member?{" "}
              <span
                className="text-green-50 cursor-pointer hover:text-white underline transition-all duration-300"
                onClick={() => navigate("/signup")} 
              >
                Signup now
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
