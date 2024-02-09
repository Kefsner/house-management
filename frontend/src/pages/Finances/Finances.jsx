import React, { useCallback, useEffect, useState } from "react";

import Modal from "../../components/common/Modal";
import Layout from "../../components/layout/Layout";

import Charts from "./sections/Charts";
import Accounts from "./sections/Accounts";
import Transactions from "./sections/Transactions";
import Categories from "./sections/Categories";

import TransactionForm from "./forms/TransactionForm";
import AccountForm from "./forms/AccountForm";
import AddCategoryForm from "./forms/CategoryForm";

import useAuthCheck from "../../hooks/useAuthCheck";

import {
  fetchTransactions,
  fetchAccounts,
  fetchCategories,
} from "../../utils/apiUtils";

import "./Finances.css";

export default function Finances(props) {
  useAuthCheck(props.url);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActions, setModalActions] = useState("");
  const openModal = (action) => {
    setIsModalOpen(true);
    setModalActions(action);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [transactions, setTransactions] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const updateTransactions = (data) => {
    setTransactions(data);
    setIncomeData(data.filter((transaction) => transaction.type === "I"));
    setExpenseData(data.filter((transaction) => transaction.type === "E"));
  };

  const handleError = (error) => {
    alert("Error: " + error);
  };

  useEffect(() => {
    fetchTransactions(updateTransactions, handleError);
    fetchCategories(setCategories, handleError);
    fetchAccounts(setAccounts, handleError);
  }, []);

  const handleTransactionSuccess = useCallback(() => {
    fetchTransactions(updateTransactions, handleError);
  }, []);

  return (
    <Layout>
      <Charts incomeData={incomeData} expenseData={expenseData} />
      <Transactions transactions={transactions} openModal={openModal} />
      <Categories categories={categories} openModal={openModal} />
      <Accounts accounts={accounts} openModal={openModal} />
      <Modal isOpen={isModalOpen}>
        {modalActions === "add-transaction" && (
          <TransactionForm
            categories={categories}
            accounts={accounts}
            onSuccess={handleTransactionSuccess}
            closeModal={closeModal}
          />
        )}
        {modalActions === "add-category" && (
          <AddCategoryForm closeModal={closeModal} />
        )}
        {modalActions === "add-account" && (
          <AccountForm
            closeModal={closeModal}
            fetchAccounts={fetchAccounts}
            setAccounts={setAccounts}
          />
        )}
      </Modal>
    </Layout>
  );
}
