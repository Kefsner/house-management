import React, { useState, FormEvent, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../apiUtils/auth";
import { apiURL } from "../../../apiUtils/constants";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

import { Category } from "../../Categories/Components/CategoryForm";
import { Account } from "./AccountForm";
import { CreditCard } from "../../CreditCards/Components/CreditCardForm";


export default function TransactionForm(props: TransactionFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TransactionFormData>({
    type: "",
    description: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    category: "",
    subcategory: "",
    paymentMethod: "",
    credit_card: "",
    installments: "",
    from_account: "",
    account: "",
    user: localStorage.getItem("username"),
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const apiEndpoint = formData.credit_card
        ? `finances/credit_card/create_transaction/`
        : formData.type !== "transfer"
        ? `finances/transaction/create/`
        : `finances/transfer/create/`;
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData: TransactionResponseData = await response.json();
      console.log(responseData);
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
          from_account: "",
          account: "",
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
        label="Value"
        required
        min={0}
        step={0.01}
      />
      <Select
        id="transaction-type"
        value={formData.type}
        onChange={(event) =>
          setFormData({
            ...formData,
            type: event.target.value,
            category: "",
            subcategory: "",
            from_account: "",
            account: "",
            paymentMethod: "",
            credit_card: "",
            installments: "",
          })
        }
        label="Type"
        placeholder="Select type"
        options={[
          { id: "income", value: "income", label: "Income" },
          { id: "expense", value: "expense", label: "Expense" },
          { id: "transfer", value: "transfer", label: "Transfer" },
        ]}
        required
      />
      {formData.type &&
        (formData.type !== "transfer" ? (
          <Select
            id="transaction-category"
            value={formData.category}
            onChange={(event) =>
              setFormData({
                ...formData,
                category: event.target.value,
                subcategory: "",
              })
            }
            label="Category"
            placeholder="Select a category"
            options={props.categories
              .filter((category) => category.type === formData.type)
              .map((category) => ({
                id: category.name,
                value: category.name,
                label: category.name,
              }))}
            required
          />
        ) : (
          <Select
            id="transaction-from-account"
            value={formData.from_account}
            onChange={(event) =>
              setFormData({
                ...formData,
                from_account: event.target.value,
                account: "",
              })
            }
            label="From Account"
            placeholder="Select an account"
            options={props.accounts.map((account) => ({
              id: account.name,
              value: account.name,
              label: account.name,
            }))}
            required
          />
        ))}
      {formData.category && (
        <Select
          id="transaction-subcategory"
          value={formData.subcategory}
          onChange={(event) =>
            setFormData({
              ...formData,
              subcategory: event.target.value,
            })
          }
          label="Subcategory"
          placeholder="Select a subcategory"
          options={[
            { id: "subcategory", value: "subcategory", label: "Subcategory" },
            { id: "subcategory2", value: "subcategory2", label: "Subcategory2" },
          ]}
          required
        />
      )}
      {formData.type !== "transfer" && (
        <Input
          type="text"
          id="transaction-description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
          label="Description"
          required
        />
      )}
      {formData.type === "expense" && (
        <Select
          id="transaction-payment-method"
          value={formData.paymentMethod}
          onChange={(event) =>
            setFormData({
              ...formData,
              paymentMethod: event.target.value,
            })
          }
          label="Payment Method"
          placeholder="Select a payment method"
          options={[
            { id: "debit", value: "debit", label: "Pix / Transfer / debitCard" },
            { id: "credit", value: "credit", label: "Credit Card" },
          ]}
          required
        />
      )}
      {formData.paymentMethod === "credit" ? (
        <>
          <Select
            id="transaction-credit-card"
            label="Credit Card"
            value={formData.credit_card}
            onChange={(event) =>
              setFormData({
                ...formData,
                credit_card: event.target.value,
              })
            }
            placeholder="Select a credit card"
            options={
              [{ id: "credit-card", value: "credit-card", label: "Credit Card" }]
            }
            required
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
            required
            min={1}
          />
        </>
      ) : (
        <Select
          id="transaction-account"
          value={formData.account}
          onChange={(event) =>
            setFormData({
              ...formData,
              account: event.target.value,
            })
          }
          label={formData.type === "transfer" ? "To Account" : "Account"}
          options={props.accounts.map((account) => ({
            id: account.name,
            value: account.name,
            label: account.name,
          }))}
          placeholder="Select an account"
          required
        />
      )}
      <Input
        type="date"
        id="transaction-date"
        value={formData.date}
        onChange={(event) =>
          setFormData({
            ...formData,
            date: event.target.value,
          })
        }
        label="Date"
        required
      />
      <Button type="submit" label="Add transaction" />
      <Button
        type="button"
        onClick={props.closeModal}
        label="Cancel"
      />
    </form>
  );
}

interface TransactionFormProps {
  categories: Category[];
  accounts: Account[];
  creditCards: CreditCard[];
  closeModal: () => void;
  onSuccess: () => void;
}

interface TransactionFormData {
  type: string;
  description: string;
  value: string;
  date: string;
  category: string;
  subcategory: string;
  paymentMethod: string;
  credit_card: string;
  installments: string;
  from_account: string;
  account: string;
  user: string | null;
}

interface TransactionResponseData {
  message: string;
}

export interface Transaction {
  id: number;
  type: string;
  description: string;
  value: string;
  date: string;
  category: string;
  subcategory: string;
  paymentMethod: string;
  credit_card: string;
  installments: string;
  from_account: string;
  account: string;
  user: string;
}