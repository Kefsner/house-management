import React from "react";

import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";

import { Transaction } from "../Components/TransactionForm";

export default function Transactions(props: TransactionsProps) {
  return (
    <>
      <Button
        onClick={() => {
          props.openModal("add-transaction");
        }}
        label="Add Transaction"
      />
      {/* <Table
        headers={[
          "Type",
          "Date",
          "Amount",
          "Description",
          "Category",
          "Subcategory",
          "Account",
        ]}
        rows={props.transactions.map((transaction) => ({
          Type: transaction.type,
          Date: transaction.date,
          Amount: transaction.value,
          Description: transaction.description,
          Category: transaction.category,
          Subcategory: transaction.subcategory,
          Account: transaction.account,
        }))}
      /> */}
    </>
  );
}

interface TransactionsProps {
  transactions: Transaction[];
  openModal: (action: string) => void;
}
