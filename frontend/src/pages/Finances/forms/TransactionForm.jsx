import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import Input from "./partials/Input";
import Select from "./partials/Select";
import Button from "./partials/Button";

export default function TransactionForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "", // Expense or Income (E or I)
    description: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    subcategory: "",
    paymentMethod: "",
    credit_card: "",
    installments: "",
    account: "",
    user: localStorage.getItem("userId"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiEndpoint = formData.credit_card
        ? `finances/credit_card/create_transaction/`
        : `finances/transaction/create/`;
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        setFormData({
          type: "",
          description: "",
          value: "",
          date: new Date().toISOString().slice(0, 10),
          category: "",
          subcategory: "",
          paymentMethod: "",
          credit_card: "",
          installments: "",
          user: localStorage.getItem("username"),
        });
        props.onSuccess();
        props.closeModal();
      } else if (response.status === 401) {
        await handleLogout(navigate);
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 500
      ) {
        console.error("Error:");
      }
    } catch (error) {
      console.error("Error:");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <Input
        type="number"
        id="transaction-value"
        label="Value"
        value={formData.value}
        onChange={(event) => {
          const match = event.target.value.match(/^\d*(\.\d{0,2})?$/);
          if (match) {
            setFormData({
              ...formData,
              value: event.target.value,
            });
          }
        }}
        required
        min={0}
        step="0.01"
      />
      <Select
        id="transaction-type"
        label="Type"
        value={formData.type}
        options={[
          { value: "I", label: "Income" },
          { value: "E", label: "Expense" },
        ]}
        onChange={(event) =>
          setFormData({
            ...formData,
            type: event.target.value,
            category: "",
            subcategory: "",
          })
        }
        required={true}
        placeholder="Select type"
      />
      {formData.type && (
        <Select
          id="transaction-category"
          label="Category"
          options={props.categories.filter(
            (category) => category.type === formData.type
          )}
          value={formData.category}
          onChange={(event) =>
            setFormData({
              ...formData,
              category: event.target.value,
              subcategory: "",
            })
          }
          required={true}
          placeholder="Select a category"
        />
      )}
      {formData.category && (
        <Select
          id="transaction-subcategory"
          label="Subcategory"
          options={
            props.categories.find(
              (category) => category.name === formData.category
            ).subcategories
          }
          value={formData.subcategory}
          onChange={(event) =>
            setFormData({
              ...formData,
              subcategory: event.target.value,
            })
          }
          required={true}
          placeholder="Select a subcategory"
        />
      )}
      <Input
        type="text"
        id="transaction-description"
        label="Description"
        value={formData.description}
        onChange={(event) =>
          setFormData({
            ...formData,
            description: event.target.value,
          })
        }
        required={true}
      />
      {formData.type === "E" && (
        <Select
          id="transaction-payment-method"
          label="Payment Method"
          options={[
            { value: "debit", label: "Pix / Transfer / debitCard" },
            { value: "credit", label: "Credit Card" },
          ]}
          value={formData.paymentMethod}
          onChange={(event) =>
            setFormData({
              ...formData,
              paymentMethod: event.target.value,
            })
          }
          required={true}
          placeholder="Select a payment method"
        />
      )}
      {formData.paymentMethod === "credit" ? (
        <>
          <Select
            id="transaction-credit-card"
            label="Credit Card"
            options={props.creditCards}
            value={formData.credit_card}
            onChange={(event) =>
              setFormData({
                ...formData,
                credit_card: event.target.value,
              })
            }
            required={true}
            placeholder="Select a credit card"
          />
          <Input
            type="number"
            id="transaction-installments"
            label="Installments"
            value={formData.installments}
            onChange={(event) => {
              const match = event.target.value.match(/^\d*$/);
              if (match) {
                setFormData({
                  ...formData,
                  installments: event.target.value,
                });
              }
            }}
            required={true}
            min={1}
          />
        </>
      ) : (
        <Select
          id="transaction-account"
          label="Account"
          options={props.accounts}
          value={formData.account}
          onChange={(event) =>
            setFormData({
              ...formData,
              account: event.target.value,
            })
          }
          required={true}
          placeholder="Select an account"
        />
      )}
      <Input
        type="date"
        id="transaction-date"
        label="Date"
        value={formData.date}
        onChange={(event) =>
          setFormData({
            ...formData,
            date: event.target.value,
          })
        }
        required={true}
      />
      <Button type="submit" className="form-button" label="Add transaction" />
      <Button
        type="button"
        className="form-button"
        onClick={props.closeModal}
        label="Cancel"
      />
    </form>
  );
}
