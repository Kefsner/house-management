import React from "react";

export default function Accounts(props) {
  return (
    <section className="finances-accounts-section">
      <button
        className="add-account-button"
        onClick={() => {
          props.openModal("add-account");
        }}
      >
        Add Account
      </button>
      <table className="accounts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>User</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.map((account) => (
            <tr key={account.id}>
              <td>{account.name}</td>
              <td>{account.user}</td>
              <td>{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
