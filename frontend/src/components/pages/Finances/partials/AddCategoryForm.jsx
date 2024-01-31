import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCsrfToken, logErrorToServer } from "../../../../utils/utils";

import "./AddCategoryForm.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function AddCategoryForm(props) {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    type: props.type,
    name: "",
    user: localStorage.getItem("username"),
    category: props.category,
  });

  const handleCategorySubmit = () => async (event) => {
    event.preventDefault();

    const apiEndpoint = props.category
      ? `finances/subcategory/create/`
      : "finances/category/create/";

    const csrfToken = getCsrfToken();
    try {
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
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
        logErrorToServer(responseData, "AddCategoryForm.jsx");
      } else {
        logErrorToServer(responseData, "Finances.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in Finances.jsx");
    }
  };
  return (
    <form
      onSubmit={handleCategorySubmit(props.category)}
      className="add-category-form"
    >
      <div className="add-category-form-header">
        {props.category ? (
          <h3 className="add-category-title">
            Add subcategory to {props.category}
          </h3>
        ) : (
          <h2 className="add-category-title">Add category</h2>
        )}
        <button
          type="button"
          onClick={() => navigate("categories")}
          className="add-category-manage"
        >
          Manage categories
        </button>
      </div>
      <label htmlFor="type" className="add-category-label">
        Type
      </label>
      <input
        id="type"
        className="add-category-select"
        value={props.type}
        onChange={(event) =>
          setCategoryData({ ...categoryData, type: event.target.value })
        }
        required={true}
        readOnly={true}
      />
      <label htmlFor="name" className="add-category-label">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="add-category-input"
        value={categoryData.name}
        onChange={(event) =>
          setCategoryData({ ...categoryData, name: event.target.value })
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
