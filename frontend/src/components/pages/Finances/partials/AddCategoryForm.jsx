import React, { useState } from "react";

import { getCsrfToken, logErrorToServer } from "../../../../utils/utils";

import "./AddCategoryForm.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function AddCategoryForm(props) {
  const [categoryData, setCategoryData] = useState({
    type: "",
    description: "",
    user: localStorage.getItem("username"),
  });

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCsrfToken();
    try {
      const response = await fetch(`${apiURL}finances/category/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(categoryData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        props.onCategoryAdded();
        props.closeModal();
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 500
      ) {
        console.log(responseData);
      } else {
        logErrorToServer(responseData, "Finances.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in Finances.jsx");
    }
  };
  return (
    <form onSubmit={handleCategorySubmit} className="add-category-form">
      <label htmlFor="type" className="add-category-label">
        Type
      </label>
      <select
        id="type"
        className="add-category-select"
        value={categoryData.type}
        onChange={(event) =>
          setCategoryData({ ...categoryData, type: event.target.value })
        }
        required={true}
      >
        <option value="">Select type</option>
        <option value="I">Income</option>
        <option value="E">Expense</option>
      </select>
      <label htmlFor="description" className="add-category-label">
        Description
      </label>
      <input
        type="text"
        id="description"
        className="add-category-input"
        value={categoryData.description}
        onChange={(event) =>
          setCategoryData({ ...categoryData, description: event.target.value })
        }
        required={true}
      />
      <div className="add-category-buttons">
        <button
          type="button"
          onClick={() => props.closeModal()}
          className="add-category-button"
        >
          Cancel
        </button>
        
        <button type="submit" className="add-category-button">
          Confirm
        </button>
      </div>
    </form>
  );
}
