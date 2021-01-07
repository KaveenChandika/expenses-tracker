import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
function Income() {
  const { transactions } = useContext(GlobalContext);
  const amount = transactions.map((transaction) => transaction.amount);

  const income = amount
    .filter((item) => item > 0)
    .reduce((intot, item) => (intot += item), 0)
    .toFixed(2);

  const expense = amount
    .filter((item) => item < 0)
    .reduce((exptot, item) => (exptot += item), 0) * -1
    .toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Icome</h4>
        <p className="money plus">{income}</p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className="money plus">{expense}</p>
      </div>
    </div>
  );
}

export default Income;
