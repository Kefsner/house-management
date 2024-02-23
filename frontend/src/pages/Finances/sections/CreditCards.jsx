import React from "react";

import Table from "../../../components/common/Table";
import Button from "../forms/partials/Button";

export default function CreditCards(props) {
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
        title="Credit Cards"
        headers={["Name", "Account", "Limit", "Closing Day", "Due Day", "Current Limit"]}
        rows={props.creditCards}
      />
    </section>
  );
}
