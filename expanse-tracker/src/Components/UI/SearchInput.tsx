import type React from "react";
import { useState } from "react";

interface InputBoxType {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchInput = ({ value, placeholder, onChange }: InputBoxType) => {
  return (
    <div className="w-full bg-white mt-6 rounded mb-8">
      <input
        className="outline-none rounded cursor-pointer w-full h-[40px] pl-4 focus:outline-none focus:ring-2 focus:ring-emerald-700 "
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
