import { useState, useEffect } from "react";
import Layout from "../UI/Layout";
import Navbar from "../UI/Navbar";
import PageTitle from "../UI/PageTitle";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  // Fetch Data Function
  const fetchTransactions = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("No user logged in");
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("transaction")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching data:", error.message);
      return;
    }

    if (data) {
      setTransactions(data);
      console.log(transactions);

      const totalIncome = data
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

      const totalExpense = data
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

      setIncome(totalIncome);
      setExpense(totalExpense);
      setBalance(totalIncome - totalExpense);
    }
  };

  // useEffect for Fetch
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 pt-34 md:pt-16 px-4">
      <Navbar />
      <Layout>
        <PageTitle title="Dashboard Overview" />

        <div className="flex flex-col items-center gap-6 bg-white p-6 rounded-2xl shadow-2xl backdrop-blur-md w-full max-w-md transform transition-all hover:scale-[1.01]">
          {/* Balance */}
          <div className="w-full bg-green-100 border-green-500 p-5 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Balance</h3>
            <p className="text-2xl font-bold text-green-700 mt-1">{balance}</p>
          </div>

          {/* Income */}
          <div className="w-full bg-blue-100 border-blue-500 p-5 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Income</h3>
            <p className="text-2xl font-bold text-blue-700 mt-1">{income}</p>
          </div>

          {/* Expense */}
          <div className="w-full bg-red-100 border-red-500 p-5 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 className="text-lg font-semibold text-gray-700">Expense</h3>
            <p className="text-2xl font-bold text-red-700 mt-1">{expense}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
