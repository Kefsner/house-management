import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../apiUtils/auth";
import { apiURL } from "../../../apiUtils/constants";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

export default function AccountForm(props: AccountFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AccountFormData>({
    name: "",
    user: "",
    initial_balance: "",
    created_by: localStorage.getItem("username"),
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiURL}accounts/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData: AccountResponseData = await response.json();
      console.log(responseData);
      if (response.status === 201) {
        setFormData({
          ...formData,
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
        value={formData.name}
        onChange={(event) =>
          setFormData({
            ...formData,
            name: event.target.value,
          })
        }
        label="Name"
        required
      />
      <Select
        id="account-user"
        value={formData.user}
        onChange={(event) =>
          setFormData({
            ...formData,
            user: event.target.value,
          })
        }
        label="User"
        placeholder="Select user"
        options={[
          {
            id: localStorage.getItem("username") || "",
            value: localStorage.getItem("username") || "",
            label: localStorage.getItem("username") || "",
          }
        ]}
        required
      />
      <Input
        type="number"
        id="account-initial-value"
        value={formData.initial_balance}
        onChange={(event) => {
          const value = event.target.value;
          const pattern = /^\d*(\.\d{0,2})?$/;
          if (pattern.test(value)) {
            setFormData({
              ...formData,
              initial_balance: value,
            });
          }
        }}
        
        label="Initial Balance"
        required
        min={0}
        step={0.01}
      />
      <Button type="submit" label="Add Account" />
      <Button type="button" label="Cancel" onClick={props.closeModal} />
    </form>
  );
}

/**
 * Props for the AccountForm component.
 */
interface AccountFormProps {
  closeModal: () => void; // Function to close the modal.
  onSuccess: () => void; // Function to call after a successful form submission.
}

/**
 * The data structure for the account form.
 */
interface AccountFormData {
  name: string | ""; // The name of the account.
  user: string | ""; // The user of the account.
  initial_balance: string | ""; // The initial balance of the account.
  created_by: string | null; // The user who created the account.
}

/**
 * The data structure for the server response.
 */
interface AccountResponseData {
  message: string; // The message from the server.
}

/**
 * The data structure for the account.
 */
export interface Account {
  id: number; // The account ID.
  name: string; // The account name.
  user: string; // The account owner.
  balance: string; // The current balance of the account.
}