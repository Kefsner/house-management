import React from "react";

import Table from "../forms/partials/Table";

export default function CreditCardTransactions(props) {
  return (
    <section className="finances-credit-card-transactions-section">
      <Table
        headers={["Date", "Amount", "Installments", "Description", "Category", "Subcategory"]}
        rows={props.creditCardTransactions}
      />
    </section>
  );
}