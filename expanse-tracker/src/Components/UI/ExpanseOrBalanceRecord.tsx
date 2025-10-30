interface IncomeRecordType {
  expense: number,
  income: number,
  balance:number
}

const ExpanseOrBalanceRecord = ({ expense, income,balance }: IncomeRecordType) => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow text-center">{expense}</div>
      <div className="bg-white p-4 rounded-lg shadow text-center">{income}</div>
      <div className="bg-white p-4 rounded-lg shadow text-center">{balance}</div>
    </div>
  );
};

export default ExpanseOrBalanceRecord;
