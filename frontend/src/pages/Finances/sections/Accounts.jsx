import React from "react";

import Table from "../forms/partials/Table";
import Button from "../forms/partials/Button";

export default function Accounts(props) {
  return (
      <section className="finances-accounts-section">
        <Button
          className="add-button"
          onClick={() => {
            props.openModal("add-account");
          }}
          label="Add Account"
        />
        <Table
          headers={["Name", "Balance", "User"]}
          rows={props.accounts}
        />    
      </section>
  );
}
