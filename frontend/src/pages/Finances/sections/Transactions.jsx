import React from "react";

export default function Transactions(props) {
  return (
    <section className="finances-transactions-section">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Value</th>
            <th>Category</th>
            <th>Subcategory</th>
          </tr>
        </thead>
        <tbody>
          {props.transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.value}</td>
              <td>{transaction.category}</td>
              <td>{transaction.subcategory}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
