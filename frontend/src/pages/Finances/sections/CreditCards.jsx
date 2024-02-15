import React from "react";

import Table from "../forms/partials/Table";
import Button from "../forms/partials/Button";

export default function CreditCards(props) {
    console.log("CreditCards props", props);
  return (
    <section className="finances-credit-cards-section">
      <Button
        className="add-button"
        onClick={() => {
          props.openModal("add-credit-card");
        }}
        label="Add Credit Card"
      />
      <Table
        headers={["Name", "Balance", "Account"]}
        rows={[{ name: "Visa", balance: 1000, account: "Bank of America" }]}
      />
    </section>
  );
}
