import React, { useCallback, useEffect, useState } from "react";

import Modal from "../../components/common/Modal";
import Layout from "../../components/layout/Layout";

import Charts from "./sections/Charts";
import Accounts from "./sections/Accounts";
import Transactions from "./sections/Transactions";
import Categories from "./sections/Categories";
import CreditCards from "./sections/CreditCards";
import CreditCardTransactions from "./sections/CreditCardTransactions";

import TransactionForm from "./forms/TransactionForm";
import AddCategoryForm from "./forms/CategoryForm";
import AccountForm from "./forms/AccountForm";
import CreditCardForm from "./forms/CreditCardForm";

import useAuthCheck from "../../hooks/useAuthCheck";

import {
  fetchTransactions,
  fetchCategories,
  fetchAccounts,
  fetchCreditCards,
  fetchCreditCardTransactions,
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
  const [creditCards, setCreditCards] = useState([]);
  const [creditCardTransactions, setCreditCardTransactions] = useState([]);

  const updateTransactions = (data) => {
    setTransactions(data);
    setIncomeData(data.filter((transaction) => transaction.type === "I"));
    setExpenseData(data.filter((transaction) => transaction.type === "E"));
  };

  const handleError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    fetchTransactions(updateTransactions, handleError);
    fetchCategories(setCategories, handleError);
    fetchAccounts(setAccounts, handleError);
    fetchCreditCards(setCreditCards, handleError);
  }, []);

  useEffect(() => {
    for (let i = 0; i < creditCards.length; i++) {
      fetchCreditCardTransactions(
        creditCards[i].id,
        setCreditCardTransactions,
        handleError
      );
    }
  }, [creditCards]);

  const handleSuccess = useCallback(() => {
    fetchTransactions(updateTransactions, handleError);
    fetchCategories(setCategories, handleError);
    fetchAccounts(setAccounts, handleError);
    fetchCreditCards(setCreditCards, handleError);
  }, []);

  // const handleCategorySuccess = useCallback(() => {
  //   fetchCategories(setCategories, handleError);
  // }, []);

  // const handleAccountSuccess = useCallback(() => {
  //   fetchAccounts(setAccounts, handleError);
  // }, []);

  // const handleCreditCardSuccess = useCallback(() => {
  //   fetchCreditCards(setCreditCards, handleError);
  // }, []);

  return (
    <Layout>
      <Charts incomeData={incomeData} expenseData={expenseData} />
      <div className="finances-content-group">
        <Transactions transactions={transactions} openModal={openModal} />
        <Categories categories={categories} openModal={openModal} />
      </div>
      <div className="finances-content-group">
        <Accounts accounts={accounts} openModal={openModal} />
        <CreditCards creditCards={creditCards} openModal={openModal} />
        <CreditCardTransactions
          creditCardTransactions={creditCardTransactions}
        />
      </div>
      <Modal isOpen={isModalOpen}>
        {modalActions === "add-transaction" && (
          <TransactionForm
            categories={categories}
            accounts={accounts}
            creditCards={creditCards}
            onSuccess={handleSuccess}
            closeModal={closeModal}
          />
        )}
        {modalActions === "add-category" && (
          <AddCategoryForm
            categories={categories}
            onSuccess={handleSuccess}
            closeModal={closeModal}
          />
        )}
        {modalActions === "add-account" && (
          <AccountForm
            onSuccess={handleSuccess}
            closeModal={closeModal}
          />
        )}
        {modalActions === "add-credit-card" && (
          <CreditCardForm
            accounts={accounts}
            onSuccess={handleSuccess}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </Layout>
  );
}
