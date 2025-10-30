import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      alert("You have been logged out!");
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-300 via-emerald-400 to-green-500 shadow-lg py-3 px-6 flex flex-col sm:flex-row sm:justify-between items-center z-10 gap-3 sm:gap-0">
      <h1 className="text-3xl font-bold text-white drop-shadow-md">
        Expense Tracker
      </h1>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-2 sm:mt-0">
        <Link
          to="/"
          className="text-white hover:bg-white/20 transition-all px-4 py-2 rounded-md font-medium text-center"
        >
          Dashboard
        </Link>
        <Link
          to="/add"
          className="text-white hover:bg-white/20 transition-all px-4 py-2 rounded-md font-medium text-center"
        >
          Add Transaction
        </Link>
        <Link
          to="/history"
          className="text-white hover:bg-white/20 transition-all px-4 py-2 rounded-md font-medium text-center"
        >
          History
        </Link>

        <button
          onClick={handleLogout}
          className="bg-emerald-600 text-center hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
