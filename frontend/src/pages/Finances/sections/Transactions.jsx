import React from "react";

import Table from "../forms/partials/Table";
import Button from "../forms/partials/Button";

export default function Transactions(props) {
  return (
    <section className="finances-transactions-section">
      <Button
        className="add-button"
        onClick={() => {
          props.openModal("add-transaction");
        }}
        label="Add Transaction"
      />
      <Table
        title="Transactions"
        headers={["Type", "Date", "Amount", "Description", "Category", "Subcategory", "Account"]}
        rows={props.transactions}
      />
    </section>
  );
}
