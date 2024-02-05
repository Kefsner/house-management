import React, { useState, useEffect } from "react";

import { fetchCategories } from "../../../utils/apiUtils";

import "./TransactionForm.css";

export default function TransactionForm(props) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (!props.transactionFormData.type) {
      setCategories([]);
      return;
    }
    const onSuccess = (data) => {
      setCategories(data);
    };
    const onError = (error) => {
      console.error("Error:", error);
    };
    fetchCategories(props.transactionFormData.type, null, onSuccess, onError);
  }, [props.transactionFormData.type]);

  useEffect(() => {
    if (!props.transactionFormData.category) {
      setSubcategories([]);
      return;
    }
    const onSuccess = (data) => {
      setSubcategories(data);
    };
    const onError = (error) => {
      console.error("Error:", error);
    };
    fetchCategories(
      props.transactionFormData.type,
      props.transactionFormData.category,
      onSuccess,
      onError
    );
  }, [props.transactionFormData.type, props.transactionFormData.category]);

  return (
    <>
      <form
        onSubmit={props.handleTransactionSubmit}
        className="form-form"
      >
        <div className="form-radio-container">
          <div className="form-radio-option">
            <label
              htmlFor="income-radio"
              className="form-radio-label"
            >
              Income
            </label>
            <input
              type="radio"
              id="income-radio"
              className="form-radio-input"
              name="type"
              value="I"
              checked={props.transactionFormData.type === "I"}
              onChange={(event) =>
                props.setTransactionFormData({
                  ...props.transactionFormData,
                  type: event.target.value,
                  category: "",
                  subcategory: "",
                })
              }
              required={true}
            />
          </div>
          <div className="form-radio-option">
            <label
              htmlFor="expense-radio"
              className="form-radio-label"
            >
              Expense
            </label>
            <input
              type="radio"
              id="expense-radio"
              className="form-radio-input"
              name="type"
              value="E"
              checked={props.transactionFormData.type === "E"}
              onChange={(event) =>
                props.setTransactionFormData({
                  ...props.transactionFormData,
                  type: event.target.value,
                  categpry: "",
                  subcategory: "",
                })
              }
              required={true}
            />
          </div>
        </div>
        {props.transactionFormData.type && (
          <>
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <div className="form-category-container">
              <select
                id="category"
                className="form-select"
                autoComplete="off"
                value={props.transactionFormData.category}
                onChange={(event) =>
                  props.setTransactionFormData({
                    ...props.transactionFormData,
                    category: event.target.value,
                  })
                }
                required={true}
              >
                <option value="" disabled hidden>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        {props.transactionFormData.category && (
          <>
            <label htmlFor="subcategory" className="form-label">
              Subcategory
            </label>
            <div className="form-category-container">
              <select
                id="subcategory"
                className="form-select"
                autoComplete="off"
                value={props.transactionFormData.subcategory}
                onChange={(event) =>
                  props.setTransactionFormData({
                    ...props.transactionFormData,
                    subcategory: event.target.value,
                  })
                }
                required={true}
              >
                <option value="" disabled hidden>
                  Select a subcategory
                </option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="form-input"
          value={props.transactionFormData.description}
          onChange={(event) =>
            props.setTransactionFormData({
              ...props.transactionFormData,
              description: event.target.value,
            })
          }
          minLength={3}
          maxLength={50}
        />
        <label htmlFor="value" className="form-label">
          Value
        </label>
        <input
          type="number"
          id="value"
          className="form-input"
          step="0.01"
          value={props.transactionFormData.value}
          onChange={(event) => {
            const match = event.target.value.match(/^\d*(\.\d{0,2})?$/);
            if (match) {
              props.setTransactionFormData({
                ...props.transactionFormData,
                value: event.target.value,
              });
            }
          }}
          required={true}
          min={0}
        />
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="form-input"
          autoComplete="off"
          value={props.transactionFormData.date}
          onChange={(event) =>
            props.setTransactionFormData({
                ...props.transactionFormData,
                date: event.target.value,
            })
          }
          required={true}
        />
        { props.transactionFormData.type === "E" && (
            <>
            <label htmlFor="paymentMethod" className="form-label">
                Payment Method
            </label>
            <select
                id="paymentMethod"
                className="form-select"
                autoComplete="off"
                value={props.transactionFormData.paymentMethod}
                onChange={(event) =>
                    props.setTransactionFormData({
                    ...props.transactionFormData,
                    paymentMethod: event.target.value,
                    })
                }
                required={true}
            >
                <option value="" disabled hidden>
                    Select a payment method
                </option>
                <option value="cash">Cash</option>
                <option value="pix">Pix</option>
                <option value="creditCard">Credit Card</option>
                <option value="debitCard">Debit Card</option>
            </select>
            </>
        )}
        { props.transactionFormData.paymentMethod === "creditCard" && (
            <>
            <label htmlFor="creditCard" className="form-label">
                Credit Card
            </label>
            <select
                id="creditCard"
                className="form-select"
                autoComplete="off"
                value={props.transactionFormData.creditCard}
                onChange={(event) =>
                    props.setTransactionFormData({
                    ...props.transactionFormData,
                    creditCard: event.target.value,
                    })
                }
                required={true}
            >
                <option value="" disabled hidden>
                    Select a credit card
                </option>
                <option value="nubank">Nubank</option>
                <option value="itau">Itaú</option>
                <option value="santander">Santander</option>
                <option value="bradesco">Bradesco</option>
                <option value="caixa">Caixa</option>
            </select>
            <label htmlFor="installments" className="form-label">
                Installments
            </label>
            <input
                type="number"
                id="installments"
                className="form-input"
                value={props.transactionFormData.installments}
                onChange={(event) => {
                    const match = event.target.value.match(/^\d*$/);
                    if (match) {
                    props.setTransactionFormData({
                        ...props.transactionFormData,
                        installments: event.target.value,
                    });
                    }
                }}
                required={true}
                min={1}
            />
            </>
        )}
        { props.transactionFormData.paymentMethod !== "creditCard" && (
            <>
            <label htmlFor="account" className="form-label">
                Account
            </label>
            <select
                id="account"
                className="form-select"
                autoComplete="off"
                value={props.transactionFormData.account}
                onChange={(event) =>
                    props.setTransactionFormData({
                    ...props.transactionFormData,
                    account: event.target.value,
                    })
                }
                required={true}
            >
                <option value="" disabled hidden>
                    Select an account
                </option>
                { props.transactionFormData.paymentMethod === "cash" ? (
                    <option value="wallet">Wallet</option>
                ) : (
                    <>
                    <option value="nubank">Nubank</option>
                    <option value="itau">Itaú</option>
                    </>
                )}
            </select>
            </>
        )}
        <button type="submit" className="form-button">
          Add transaction
        </button>
        <button
          type="button"
          className="form-button"
          onClick={props.closeModal}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
