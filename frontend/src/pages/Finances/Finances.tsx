import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";
import Button from "../../components/common/Button";

// import { Transaction } from "./components/TransactionForm";

import "./Finances.css";

export default function Finances(props: FinancesProps) {
  useAuthCheck(props.url);

  const navigate = useNavigate();

  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [incomeData, setIncomeData] = useState([]);
  // const [expenseData, setExpenseData] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [accounts, setAccounts] = useState([]);
  // const [creditCards, setCreditCards] = useState([]);
  // const [creditCardTransactions, setCreditCardTransactions] = useState([]);
  // const [recurrentTransactions, setRecurrentTransactions] = useState([]);

  // const updateTransactions = (data) => {
  //   setTransactions(data);
  //   setIncomeData(data.filter((transaction) => transaction.type === "I"));
  //   setExpenseData(data.filter((transaction) => transaction.type === "E"));
  // };

  // const handleError = (error) => {
  //   console.log(error);
  // };

  // useEffect(() => {
  //   fetchTransactions(updateTransactions, handleError);
  //   fetchCategories(setCategories, handleError);
  //   fetchAccounts(setAccounts, handleError);
  //   fetchCreditCards(setCreditCards, handleError);
  //   fetchRecurrentTransactions(setRecurrentTransactions, handleError);
  // }, []);

  // useEffect(() => {
  //   for (let i = 0; i < creditCards.length; i++) {
  //     fetchCreditCardTransactions(
  //       creditCards[i].id,
  //       setCreditCardTransactions,
  //       handleError
  //     );
  //   }
  // }, [creditCards]);

  // const handleSuccess = useCallback(() => {
  //   fetchTransactions(updateTransactions, handleError);
  //   fetchCategories(setCategories, handleError);
  //   fetchAccounts(setAccounts, handleError);
  //   fetchCreditCards(setCreditCards, handleError);
  //   for (let i = 0; i < creditCards.length; i++) {
  //     fetchCreditCardTransactions(
  //       creditCards[i].id,
  //       setCreditCardTransactions,
  //       handleError
  //     );
  //   };
  //   fetchRecurrentTransactions(setRecurrentTransactions, handleError);
  // }, [creditCards]);

  return (
    <Layout>
      {/* <Charts incomeData={incomeData} expenseData={expenseData} />
      <div className="finances-content-group">
        <Transactions transactions={transactions} openModal={openModal} />
        <Categories categories={categories} openModal={openModal} />
      </div>
      <div className="finances-content-group">
        <Accounts accounts={accounts} openModal={openModal} />
        <CreditCards creditCards={creditCards} openModal={openModal} />
        <CreditCardTransactions
          creditCardTransactions={creditCardTransactions} openModal={openModal}
        />
      </div>
      <div className="finances-content-group">
        <RecurrentTransactions
          transactions={recurrentTransactions}
          openModal={openModal}
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
        {modalActions === "pay-credit-card" && (
          <PayCreditCardForm
            creditCards={creditCards}
            creditCardTransactions={creditCardTransactions}
            onSuccess={handleSuccess}
            closeModal={closeModal}
          />
        )}
      </Modal> */}
      <Button type="button" onClick={() => navigate("/")} label="Back" />
    </Layout>
  );
}

interface FinancesProps {
  url: string;
}
