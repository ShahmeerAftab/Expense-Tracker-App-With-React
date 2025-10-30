import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import React, { useState } from "react";
import InputField from "./AuthUIComponents/Input";
import Button from "./AuthUIComponents/AuthButton";
import Heading from "./AuthUIComponents/Heading";
const ResetPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    }

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfuly");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandle}>
        <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 min-h-screen flex justify-center items-center px-4">
          <div className="bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400 w-full max-w-[380px] sm:max-w-[420px] md:max-w-[440px] rounded-lg shadow-lg transform transition-all duration-500 hover:scale-[1.02] p-6 sm:p-8">
            {/* Title */}
            <Heading label="Reset Password"/>

            {/* Input */}
            <div className="flex flex-col items-center gap-4">
              <InputField
                type="password"
                name="password"
                value={password}
                placeholder="Enter new password"
                onChange={handleChange}
              />
              <InputField
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={handleConfirm}
              />

              
              {/* Button */}
              <Button type="submit" label="Update Password" />
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
    </div>
  );
};

export default ResetPage;
