import React from "react";

import Table from "../../../components/common/Table";

export default function RecurrentTransactions(props) {
  return (
    <section
      className="
        finances-recurrent-transactions-section"
    >
      <Table
        title="Recurrent Transactions"
        headers={[
          "Name",
          "Amount",
          "Category",
          "Subcategory",
          "Account",
          "Due Day",
          "Installments",
        ]}
        rows={[]}
      />
    </section>
  );
}
