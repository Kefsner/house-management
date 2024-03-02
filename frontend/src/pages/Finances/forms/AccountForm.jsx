import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../apiUtils/auth";
import { apiURL } from "../../../apiUtils/constants";

import Input from "./partials/Input";
import Select from "./partials/Select";
import Button from "./partials/Button";

export default function AccountForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    user: "",
    initial_balance: "",
    created_by: localStorage.getItem("userId"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiEndpoint = "finances/account/create/";
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
          user: "",
          initial_balance: "",
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
        id="account-name"
        label="Name"
        value={formData.name}
        onChange={(event) =>
          setFormData({
            ...formData,
            name: event.target.value,
          })
        }
        required
      />
      <Select
        id="account-user"
        label="User"
        value={formData.user}
        options={[
          {
            value: localStorage.getItem("userId"),
            label: localStorage.getItem("username"),
          },
        ]}
        onChange={(event) =>
          setFormData({
            ...formData,
            user: event.target.value,
          })
        }
        required
        placeholder="Select user"
      />
      <Input
        type="number"
        id="account-initial-value"
        label="Initial Balance"
        value={formData.initial_balance}
        onChange={(event) =>
          setFormData({
            ...formData,
            initial_balance: event.target.value,
          })
        }
        required
        min={0}
        step="0.01"
      />
      <Button type="submit" label="Save" className="form-button" />
      <Button
        type="button"
        label="Cancel"
        className="form-button"
        onClick={props.closeModal}
      />
    </form>
  );
}
