import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import Input from "./partials/Input";
import Select from "./partials/Select";
import Button from "./partials/Button";

export default function PayCreditCardForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    credit_card: "",
    value: "",
    date: new Date().toISOString().slice(0, 10),
    user: localStorage.getItem("userId"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiURL}finances/credit_card/pay/`, {
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
          credit_card: "",
          value: "",
          date: new Date().toISOString().slice(0, 10),
          user: localStorage.getItem("username"),
        });
        props.onSuccess();
      } else if (response.status === 401) {
        handleLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
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
      {formData.credit_card && (
        <>
        <Input
          type="number"
          id="transaction-value"
          label="Value"
          value={formData.value}
          onChange={(event) =>
            setFormData({ ...formData, value: event.target.value })
          }
          required={true}
        />
        </>
      )}
      <Button
        type="submit"
        className="form-button"
        label="Pay Credit Card Statement"
      />
      <Button
        type="button"
        className="form-button"
        label="Cancel"
        onClick={props.closeModal}
      />
    </form>
  );
}
