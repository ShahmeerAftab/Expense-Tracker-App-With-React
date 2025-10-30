import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import InputField from "./AuthUIComponents/Input";
import Button from "./AuthUIComponents/AuthButton";
import Heading from "./AuthUIComponents/Heading";
const ForgotPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/resetPage",
    });

    if (error) {
      alert(error.message);
    } else {
      alert(`Reset Link sent to your email "${email}"`);
      navigate("/reset");
    }
  };

  return (
    <form onSubmit={submitHandle}>
      <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 min-h-screen flex justify-center items-center px-4">
        <div className="bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400 w-full max-w-[380px] sm:max-w-[420px] md:max-w-[440px] rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] p-6 sm:p-8">
          {/* Title */}
          <Heading label="Forgot Password" />

          {/* Input */}
          <div className="flex flex-col items-center gap-4">
            <InputField
              type="text"
              name="email"
              value={email}
              placeholder="Enter your email address"
              onChange={handleClick}
            />

            {/* Button */}

            <Button type="submit" label=" Send Reset Link" />
          </div>

          {/* Back to login */}
          <div className="text-center mt-6">
            <p
              onClick={() => navigate("/login")}
              className="text-green-700 cursor-pointer hover:underline hover:text-green-800 transition-all duration-300 text-sm sm:text-base"
            >
              Back to Login
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPage;
