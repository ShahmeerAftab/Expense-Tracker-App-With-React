import React from "react";

interface TabsProps {
  active: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

const Tabs: React.FC<TabsProps> = ({ active, onTabChange }) => {
  const baseClasses =
    "border border-green-200 text-center cursor-pointer outline-none w-1/2 py-[10px] sm:py-[12px] font-semibold transition-all duration-300 text-sm sm:text-base";

  const activeClasses =
    "bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 text-green-700 hover:brightness-110";
  const inactiveClasses = "bg-white text-black hover:bg-green-50";

  return (
    <div className="flex justify-center mt-6 w-full">
      {/* LOGIN TAB */}
      <div
        onClick={() => onTabChange("login")}
        className={`${baseClasses} ${
          active === "login" ? activeClasses : inactiveClasses
        }`}
      >
        <h2>Login</h2>
      </div>

      {/* SIGNUP TAB */}
      <div
        onClick={() => onTabChange("signup")}
        className={`${baseClasses} ${
          active === "signup" ? activeClasses : inactiveClasses
        }`}
      >
        <h2>Signup</h2>
      </div>
    </div>
  );
};

export default Tabs;
