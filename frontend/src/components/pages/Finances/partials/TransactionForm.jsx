import React from "react";

import "./TransactionForm.css";

export default function TransactionForm(props) {
  return (
    <form
      onSubmit={props.handleTransactionSubmit}
      className="add-transaction-form-container"
    >
      <div className="add-transaction-form-input-container">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          autoComplete="off"
          value={props.transactionData.description}
          onChange={(event) =>
            props.setTransactionData({
              ...props.transactionData,
              description: event.target.value,
            })
          }
          autoFocus={true}
          required={true}
          minLength={3}
          maxLength={50}
          className="add-transaction-form-input"
        />
      </div>
        <div className="add-transaction-form-input-container">
            <label htmlFor="value">Value</label>
            <input
            type="number"
            id="value"
            step="0.01"
            autoComplete="off"
            value={props.transactionData.value}
            onChange={(event) =>
                props.setTransactionData({
                ...props.transactionData,
                value: event.target.value,
                })
            }
            required={true}
            min={0}
            className="add-transaction-form-input"
            />
        </div>
        <div className="add-transaction-form-input-container">
            <label htmlFor="date">Date</label>
            <input
            type="date"
            id="date"
            autoComplete="off"
            value={props.transactionData.date}
            onChange={(event) =>
                props.setTransactionData({
                ...props.transactionData,
                date: event.target.value,
                })
            }
            required={true}
            className="add-transaction-form-input"
            />
        </div>
        <div className="add-transaction-form-input-container">
            <label htmlFor="category">Category</label>
            <select
            id="category"
            autoComplete="off"
            value={props.transactionData.category}
            onChange={(event) =>
                props.setTransactionData({
                ...props.transactionData,
                category: event.target.value,
                })
            }
            required={true}
            className="add-transaction-form-input"
            >
            <option value="">Select a category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="housing">Housing</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
            </select>
        </div>
        <div className="add-transaction-form-input-container">
            <label htmlFor="type">Type</label>
            <select
            id="type"
            autoComplete="off"
            value={props.transactionData.type}
            onChange={(event) =>
                props.setTransactionData({
                ...props.transactionData,
                type: event.target.value,
                })
            }
            required={true}
            className="add-transaction-form-input"
            >
            <option value="">Select a type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            </select>
        </div>
        <button type="submit" className="add-transaction-form-button">
            Add transaction
        </button>
        <a href="/finances" className="add-transaction-form-button">
            Cancel
        </a>
    </form>
  );
}
