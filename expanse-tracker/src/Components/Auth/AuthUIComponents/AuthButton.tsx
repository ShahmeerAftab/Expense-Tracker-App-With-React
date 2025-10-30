interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, type, onClick }) => {
  return (
    <>
      <button
        type={type}
        className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 text-green-700 font-semibold cursor-pointer w-full sm:w-[360px] py-2 rounded-md shadow-md hover:scale-105 hover:shadow-lg hover:brightness-110 transition-all duration-300 text-sm sm:text-base">
        {label}
      </button>
    </>
  );
};
export default Button;
