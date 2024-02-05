import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import Modal from "../../components/common/Modal";
import Layout from "../../components/layout/Layout";

import TransactionForm from "./Forms/TransactionForm";
import AccountForm from "./Forms/AccountForm";

import useAuthCheck from "../../hooks/useAuthCheck";

import { getCsrfToken } from "../../utils/authUtils";

import { fetchTransactions, fetchAccounts } from "../../utils/apiUtils";
import { INCOME_COLORS, EXPENSE_COLORS } from "../../utils/constants";

import "./Finances.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function Finances(props) {
  useAuthCheck(props.url);

  const [transactions, setTransactions] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActions, setModalActions] = useState("");
  const [accounts, setAccounts] = useState([{id:"", name: "", user: "", balance: "" }]);

  const openModal = (action) => {
    setIsModalOpen(true);
    setModalActions(action);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [transactionFormData, setTransactionFormData] = useState({
    type: "",
    description: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    subcategory: "",
    paymentMethod: "",
    creditCard: "",
    installments: "",
    account: "",
    user: localStorage.getItem("userId"),
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
        body: JSON.stringify(transactionFormData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        setTransactionFormData({
          type: "",
          description: "",
          value: "",
          date: new Date().toISOString().slice(0, 10),
          category: "",
          subcategory: "",
          user: localStorage.getItem("username"),
        });
        updateData();
        closeModal();
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 500
      ) {
        console.error("Error:", responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateData = () => {
    const onSuccess = (data) => {
      setTransactions(data);
      setIncomeData(data.filter((transaction) => transaction.type === "I"));
      setExpenseData(data.filter((transaction) => transaction.type === "E"));
    };
    const onError = (error) => {
      console.error("Error:", error);
    };
    fetchTransactions(onSuccess, onError);
  };

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    const onSuccess = (data) => {
      setAccounts(data);
    };
    const onError = (error) => {
      console.error("Error:", error);
    };
    fetchAccounts(onSuccess, onError);
  }, []);

  const aggregateData = (data, property) => {
    const aggregatedData = data.reduce((acc, transaction) => {
      if (acc[transaction[property]]) {
        acc[transaction[property]].value += transaction.value;
      } else {
        acc[transaction[property]] = {
          category: transaction[property],
          value: transaction.value,
        };
      }
      return acc;
    }, {});
    return Object.values(aggregatedData);
  };

  const pie_chart_width = 250;
  const pie_chart_height = 250;
  const chart_text_x = 125;
  const chart_text_y = 100;
  const chart_span_dy = 30;

  const income = incomeData
    .reduce((acc, transaction) => acc + transaction.value, 0)
    .toFixed(2);

  const expense = expenseData
    .reduce((acc, transaction) => acc + transaction.value, 0)
    .toFixed(2);
  
  return (
    <Layout>
      <section className="finances-charts-section">
        <div className="income-chart">
          <PieChart width={pie_chart_width} height={pie_chart_height}>
            <text
              x={chart_text_x}
              y={chart_text_y}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              <tspan className="pie-chart-label">Income</tspan>
              <tspan
                className="pie-chart-value income"
                x={chart_text_x}
                dy={chart_span_dy}
              >{`R$ ${income}`}</tspan>
            </text>
            <Pie
              data={aggregateData(incomeData, "category")}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={90}
            >
              {incomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={INCOME_COLORS[index % INCOME_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="balance-chart">
          <PieChart width={pie_chart_width} height={pie_chart_height}>
            <text
              x={chart_text_x}
              y={chart_text_y}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              <tspan className="pie-chart-label">Balance</tspan>
              <tspan
                className="pie-chart-value balance"
                x={chart_text_x}
                dy={chart_span_dy}
              >{`R$ ${(income - expense).toFixed(2)}`}</tspan>
            </text>
            <Pie
              data={[
                { name: "Income", value: income },
                { name: "Expense", value: expense },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={90}
            >
              <Cell key={`cell-0`} fill={INCOME_COLORS[0]} />
              <Cell key={`cell-1`} fill={EXPENSE_COLORS[0]} />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="expense-chart">
          <PieChart width={pie_chart_width} height={pie_chart_height}>
            <text
              x={chart_text_x}
              y={chart_text_y}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              <tspan className="pie-chart-label">Expense</tspan>
              <tspan
                className="pie-chart-value expense"
                x={chart_text_x}
                dy={chart_span_dy}
              >{`R$ ${expense}`}</tspan>
            </text>
            <Pie
              data={aggregateData(expenseData, "category")}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={90}
            >
              {expenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </section>
      <section className="finances-accounts-section">
        <button
          className="add-account-button"
          onClick={() => {
            openModal("add-account");
          }}
        >
          Add Account
        </button>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>User</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>{account.user}</td>
                <td>{account.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="finances-transactions-section">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Value</th>
              <th>Category</th>
              <th>Subcategory</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>{transaction.value}</td>
                <td>{transaction.category}</td>
                <td>{transaction.subcategory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <button
        className="add-button"
        onClick={() => {
          openModal();
        }}
      >
        +
      </button>
      <Modal isOpen={isModalOpen}>
        {modalActions === "add-account" ? (
          <AccountForm closeModal={closeModal} />
        ) : (
          <TransactionForm
            closeModal={closeModal}
            transactionFormData={transactionFormData}
            setTransactionFormData={setTransactionFormData}
            handleTransactionSubmit={handleTransactionSubmit}
          />
        )}
      </Modal>
    </Layout>
  );
}
