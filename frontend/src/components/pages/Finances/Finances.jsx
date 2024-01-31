import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCsrfToken,
  isAuthenticated,
  logErrorToServer,
  fetchTransactions,
} from "../../../utils/utils";

import Layout from "../../layout/Layout";
import TransactionForm from "./partials/TransactionForm";
import "./Finances.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function Finances(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/auth");
    }
  }, [navigate]);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [transactionData, setTransactionData] = useState({
    type: "",
    description: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    subcategory: "",
    user: localStorage.getItem("username"),
  });

  const handleTransactionSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCsrfToken();
    try {
      const response = await fetch(`${apiURL}finances/transaction/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(transactionData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        setTransactionData({
          type: "",
          description: "",
          value: "",
          date: new Date().toISOString().slice(0, 10),
          category: "",
          subcategory: "",
          user: localStorage.getItem("username"),
        });
        updateBalance();
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 500
      ) {
        logErrorToServer(responseData, "Finances.jsx");
      } else {
        logErrorToServer(responseData, "Finances.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in Finances.jsx");
    }
  };

  const updateBalance = () => {
    const onSuccess = (data) => {
      setIncome(data.incomes);
      setExpense(data.expenses);
    };
    const onError = (error) => {
      logErrorToServer(error, "Finances.jsx");
    };
    fetchTransactions(onSuccess, onError);
  };

  useEffect(() => {
    updateBalance();
  }, []);

    // const data = {
    // labels: ["Income", "Expense"],
    // datasets: [
    //   {
    //     label: "Balance",
    //     data: [income, expense],
    //     backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
    //     borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
    //     borderWidth: 1,
    //   },
    // ],
    // };

  return (
    <Layout>
      <h1>Finances</h1>
      <section className="balance-section">
        <h2>Balance</h2>
        <p>Income: {income}</p>
        <p>Expense: {expense}</p>
        <p>Balance: {income - expense}</p>
        <div>
          {/* <Pie data={data} /> */}
        </div>
      </section>
      <section className="transactions-section">
        <h2>Transactions</h2>
        <TransactionForm
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          handleTransactionSubmit={handleTransactionSubmit}
        />
      </section>
      <section>
        <h1>Manage Categories</h1>
        <button onClick={() => navigate("categories")}>Categories</button>
      </section>
    </Layout>
  );
}
