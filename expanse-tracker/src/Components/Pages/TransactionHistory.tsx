import { useEffect, useState } from "react";
import Layout from "../UI/Layout";
import Navbar from "../UI/Navbar";
import PageTitle from "../UI/PageTitle";
import SearchInput from "../UI/SearchInput";
import { supabase } from "../../supabaseClient";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
      console.log("No user logged in");
      return;
    }

      const { data, error } = await supabase
        .from("transaction")
        .select("*")
        .eq("user_id", user.id);
      if (error) {
        console.error("Error fetching transactions:", error.message);
      } else {
        setTransactions(data);
        setFiltered(data);
      }
    };
    fetchTransactions();
  }, []);

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    const result = transactions.filter((item) =>
      item.description.toLowerCase().includes(value)
    );

    setFiltered(result);
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 pt-16 md:pt-10 px-4">
      <Layout>
        <Navbar />
        <PageTitle title="Transaction History" />

        <SearchInput
          value={search}
          placeholder="Search"
          onChange={changeHandle}
        />

        <div className="flex flex-col gap-3 mt-5">
          {filtered.length > 0 ? (
            filtered.map((t) => (
              <div
                key={t.id}
                className="flex justify-between bg-gray-100 p-3 rounded-md shadow-sm"
              >
                <span>{t.description}</span>
                <span
                  className={`font-semibold ${
                    t.type === "income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} PKR {t.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No transactions found.
            </p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default TransactionHistory;
