import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import InputField from "./AuthUIComponents/Input";
import Button from "./AuthUIComponents/AuthButton";
import Heading from "./AuthUIComponents/Heading";
import Tabs from "./AuthUIComponents/Tabs";

interface FormDataType {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const clickHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Supabase Signup logic

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      alert(`Signup error: ${error.message}`);
      return;
    }

    const user = data.user;
    if (!user) {
      alert("User not found after signup.");
      return;
    }

    // Insert into profiles table
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        full_name: formData.fullName,
        email: user.email,
      },
    ]);

    if (insertError) {
      alert(`Error saving profile: ${insertError.message}`);
    } else {
      alert("Signup successful! Please check your email for verification.");
      navigate("/login");
    }
  };

  return (
    <div>
      <form onSubmit={clickSubmit}>
        <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 min-h-screen flex justify-center items-center animate-fadeIn px-4">
          <div className="bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400 w-full max-w-[400px] sm:max-w-[420px] md:max-w-[450px] lg:max-w-[480px] min-h-[520px] sm:min-h-[540px] md:min-h-[560px] rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
            {/* Title */}
            <Heading label="Signup form" />

            {/* Tabs */}
            <div className="flex justify-center mt-6 w-full">
              <Tabs
                active="signup"
                onTabChange={(tab) => navigate(`/${tab}`)}
              />
            </div>

            {/* Inputs */}
            <div className="flex flex-col justify-center items-center w-full mt-6 gap-4 px-3 sm:px-0">
              <InputField
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Full Name"
                onChange={clickHandle}
              />
              <InputField
                type="text"
                name="email"
                value={formData.email}
                placeholder="Email Address"
                onChange={clickHandle}
              />
              <InputField
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={clickHandle}
              />
              <InputField
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={clickHandle}
              />
            </div>

            {/* Signup Button */}
            <div className="flex justify-center mt-4 px-3 sm:px-0">
              <Button type="submit" label="Signup" />
            </div>

            {/* Login Text */}
            <div className="flex justify-center pt-6">
              <p className="text-white text-sm sm:text-base">
                Already a member?{" "}
                <span
                  className="text-green-50 cursor-pointer hover:text-white underline transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Login now
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
