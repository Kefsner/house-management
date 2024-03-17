import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import { fetchTransactions } from "../../apiUtils/accounts";
import { fetchCategories } from "../../apiUtils/categories";
import { fetchAccounts } from "../../apiUtils/accounts";
import { fetchCreditCards } from "../../apiUtils/creditCards";

import TransactionForm, { Transaction } from "../Accounts/Components/TransactionForm";
import { Category } from "../Categories/Components/CategoryForm";
import { Account } from "../Accounts/Components/AccountForm";
import { CreditCard } from "../CreditCards/Components/CreditCardForm";

import Charts from "./sections/Charts";

import Layout from "../../components/layout/Layout";
import Button from "../../components/common/Button";

import { handleLogout } from "../../apiUtils/auth";

import "./Finances.css";
import Modal from "../../components/common/Modal";

/**
 * The finances page component.
 *
 * Renders the finances page content.
 */
export default function Finances(props: FinancesProps) {
  useAuthCheck(props.url);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [incomeData, setIncomeData] = useState<Transaction[]>([]);
  const [expenseData, setExpenseData] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);

  const fetchData = useCallback(async () => {
    const { data, status } = await fetchTransactions();
    if (status === 200 && data) {
      setIncomeData(
        data.filter((transaction: Transaction) => transaction.type === "income")
      );
      setExpenseData(
        data.filter((transaction: Transaction) => transaction.type === "expense")
      );
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching transactions");
    }
  }, [navigate]);

  const fetchCategoriesData = useCallback(async () => {
    const { data, status } = await fetchCategories();
    if (status === 200 && data) {
      setCategories(data);
      console.log(data);
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching categories");
    }
  }, [navigate]);

  const fetchAccountsData = useCallback(async () => {
    const { data, status } = await fetchAccounts();
    if (status === 200 && data) {
      setAccounts(data);
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching accounts");
    }
  }, [navigate]);

  const fetchCreditCardsData = useCallback(async () => {
    const { data, status } = await fetchCreditCards();
    if (status === 200 && data) {
      setCreditCards(data);
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching credit cards");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
    fetchCategoriesData();
    fetchAccountsData();
    fetchCreditCardsData();
  }, [fetchData, fetchCategoriesData, fetchAccountsData, fetchCreditCardsData]);

  return (
    <Layout>
      <Charts
        incomeData={incomeData}
        expenseData={expenseData}
      />
      <Button type="button" onClick={() => setShowModal(true)} label="Add Transaction" />
      <Button type="button" onClick={() => navigate("/")} label="Back" />
      <Modal isOpen={showModal}>
        <TransactionForm
        categories={categories}
        accounts={accounts}
        creditCards={creditCards}
        closeModal={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          fetchData();
        }}
      />
      </Modal>
    </Layout>
  );
}

interface FinancesProps {
  url: string;
}
