import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import Input from "./partials/Input";
import Select from "./partials/Select";
import Button from "./partials/Button";

export default function CreditCardForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    limit: "",
    due_date: "",
    created_by: localStorage.getItem("userId"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiEndpoint = "finances/credit_card/create/";
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
          name: "",
          account: "",
          limit: "",
          due_date: "",
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
        console.log("Error:");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <Input
        type="text"
        id="credit-card-name"
        label="Name"
        value={formData.name}
        onChange={(event) =>
          setFormData({ ...formData, name: event.target.value })
        }
        required
      />
      <Select
        id="credit-card-account"
        label="Account"
        value={formData.account}
        onChange={(event) =>
          setFormData({ ...formData, account: event.target.value })
        }
        options={props.accounts}
        required
        placeholder="Select an account"
      />
      <Input
        type="number"
        id="credit-card-limit"
        label="Credit Limit"
        value={formData.limit}
        onChange={(event) =>
          setFormData({ ...formData, limit: event.target.value })
        }
        required
      />
      <Input
        type="number"
        id="credit-card-due-date"
        label="Due Date"
        value={formData.due_date}
        onChange={(event) =>
          setFormData({ ...formData, due_date: event.target.value })
        }
        required
      />
      <Button type="submit" className="form-button" label="Add Credit Card" />
      <Button
        type="button"
        label="Cancel"
        className="form-button"
        onClick={props.closeModal}
      />
    </form>
  );
}
