import React, { useState } from "react";
import { getCsrfToken } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

export default function AccountForm(props) {
  const [accountFormData, setAccountFormData] = useState({
    name: "",
    user: "",
    initial_balance: "",
    created_by: localStorage.getItem("userId"),
  });

  const handleAccountSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCsrfToken();
    const apiEndpoint = "finances/account/create/";
    try {
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(accountFormData),
      });
      if (response.status === 201) {
        setAccountFormData({
          name: "",
          user: "",
          initial_balance: "",
        });
        const onSuccess = (data) => {
          props.setAccounts(data);
        };
        const onError = (error) => {
          console.error("Error:", error);
        };
        props.fetchAccounts(onSuccess, onError);
        props.closeModal();
      } else if (response.status === 401) {
        props.history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAccountSubmit} className="form-form">
      <h2 className="form-title">New Account</h2>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-input"
        id="name"
        value={accountFormData.name}
        onChange={(event) =>
          setAccountFormData({
            ...accountFormData,
            name: event.target.value,
          })
        }
        required
      />
      <label htmlFor="account-user" className="form-label">
        User
      </label>
      <select
        id="account-user"
        className="form-input"
        value={accountFormData.user}
        onChange={(event) =>
          setAccountFormData({
            ...accountFormData,
            user: event.target.value,
          })
        }
        required
      >
        <option value="" disabled hidden>
            Select an user
        </option>
        <option value={localStorage.getItem("userId")}>
          {localStorage.getItem("username")}
        </option>
        </select>
      <label htmlFor="account-initial-value" className="form-label">
        Initial Balance
      </label>
      <input
        type="number"
        className="form-input"
        id="account-initial-value"
        value={accountFormData.initial_balance}
        onChange={(event) =>
          setAccountFormData({
            ...accountFormData,
            initial_balance: event.target.value,
          })
        }
        required
      />
      <button type="submit" className="form-button">
        Save
      </button>
      <button type="button" className="form-button" onClick={props.closeModal}>
        Cancel
      </button>
    </form>
  );
}
