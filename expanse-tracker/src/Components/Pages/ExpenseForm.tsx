import Layout from "../UI/Layout";
import Navbar from "../UI/Navbar";
import PageTitle from "../UI/PageTitle";
import Button from "../UI/Button";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [description, setDiscription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");
  const navigate = useNavigate();

  const handleTransaction = async () => {
    if (!description || !amount) {
      alert("Please fill all fields");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("User not logged in!");
      return;
    }

    const newTransaction = {
      description,
      amount: Number(amount),
      type,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("transaction")
      .insert([newTransaction]);

    if (error) {
      console.error("Error adding transaction:", error.message);
      alert("Error adding transaction");
    } else {
      console.log("Transaction Added:", data);
      alert("Transaction added successfully!");
      setDiscription("");
      setAmount("");
      setType("income");

      // Redirect and refresh Dashboard
      navigate("/dashboard");
      window.location.reload();
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 pt-16 md:pt-10 px-4">
      <Layout>
        <Navbar />
        <PageTitle title="Add New Transaction" />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Expense Description"
            value={description}
            onChange={(e) => setDiscription(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          />
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <Button text="Add Transaction" onClick={handleTransaction} />
        </div>
      </Layout>
    </div>
  );
};

export default AddTransaction;
