import React from "react";

import Table from "../forms/partials/Table";
import Button from "../forms/partials/Button";

export default function CreditCardTransactions(props) {
  props.creditCardTransactions.forEach((transaction) => {
    const firstUnpaidInstallment = transaction.installments.find(
      (installment) => !installment.paid
    );
    if (firstUnpaidInstallment) {
      const totalInstallments = transaction.installments.length;
      const current_installment_number = `${firstUnpaidInstallment.installment_number}/${totalInstallments}`;
      transaction.total_installments = totalInstallments;
      transaction.current_installment_number = current_installment_number;
      transaction.current_installment = firstUnpaidInstallment;
    }
  });
  const rows1 = props.creditCardTransactions.map((transaction) => {
    return {
      id: transaction.id,
      date: transaction.date,
      amount: transaction.value,
      installments: transaction.total_installments,
      description: transaction.description,
      category: transaction.category,
      subcategory: transaction.subcategory,
    };
  });
  const rows2 = props.creditCardTransactions.map((transaction) => {
    return {
      id: transaction.id,
      date: transaction.date,
      amount: transaction.current_installment.value,
      current_installment: transaction.current_installment_number,
      description: transaction.description,
      category: transaction.category,
      subcategory: transaction.subcategory,
    };
  });

  const total_monthly_amount = rows2.reduce(
    (total, row) => total + row.amount,
    0
  );

  return (
    <section className="finances-credit-card-transactions-section">
      <Table
        title="Credit Card Transactions"
        headers={[
          "Date",
          "Amount",
          "Installments",
          "Description",
          "Category",
          "Subcategory",
        ]}
        rows={rows1}
      />
      <Table
        title="Outstanding Credit Card Statements"
        headers={[
          "Date",
          "Amount",
          "Installment",
          "Description",
          "Category",
          "Subcategory",
        ]}
        rows={rows2}
      />
      <Button
        className="add-button"
        onClick={() => {
          props.openModal("pay-credit-card", total_monthly_amount);
        }}
        label="Pay Credit Card Statement"
      />
    </section>
  );
}
