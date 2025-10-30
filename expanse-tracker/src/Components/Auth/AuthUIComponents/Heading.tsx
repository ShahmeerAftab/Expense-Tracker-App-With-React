import type React from "react";

interface HeadingProps {
  label: string;
}

const Heading: React.FC<HeadingProps> = ({ label }) => {
  return (
    <div>
      <h1 className="text-center pt-6 text-2xl sm:text-3xl font-bold text-green-100 drop-shadow-md">
        {label}
      </h1>
    </div>
  );
};

export default Heading;
