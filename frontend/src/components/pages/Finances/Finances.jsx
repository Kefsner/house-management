import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

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

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <Layout>
      <section className="balance-section">
      <h2>Monthly Balance for {new Date().toLocaleString("default", { month: "long" })}</h2>
        <div className="pie-chart">
          <PieChart width={400} height={400}>
            <text x={200} y={200} textAnchor="middle" dominantBaseline="middle">
              {`Balance: R$ ${income - expense}`}
            </text>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#82ca9d" : "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </section>
      <section className="transactions-section">
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
