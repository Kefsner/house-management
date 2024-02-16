import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import Input from "./partials/Input";
import Select from "./partials/Select";
import Button from "./partials/Button";

export default function AddCategoryForm(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "", // Expense or Income (E or I)
    class: "", // Category or Subcategory
    name: "",
    user: localStorage.getItem("username"),
    category: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const apiEndpoint =
        formData.class === "subcategory"
          ? "finances/subcategory/create/"
          : "finances/category/create/";
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
          class: "",
          name: "",
          user: localStorage.getItem("username"),
          category: "",
          subcategory: "",
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
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <Select
        id="category-category-type"
        label="Category or Subcategory"
        value={formData.class}
        options={[
          { value: "category", label: "Category" },
          { value: "subcategory", label: "Subcategory" },
        ]}
        onChange={(event) =>
          setFormData({
            ...formData,
            class: event.target.value,
          })
        }
        required={true}
        placeholder="Select class"
      />
      <Select
        id="category-transaction-type"
        label="Income or Expense"
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
          })
        }
        required={true}
        placeholder="Select type"
      />
      {formData.class === "subcategory" && (
        <Select
          id="category-category"
          label="Category"
          value={formData.category}
          options={props.categories.filter(
            (category) => category.type === formData.type
          )}
          onChange={(event) =>
            setFormData({
              ...formData,
              category: event.target.value,
            })
          }
          required={true}
          placeholder="Select category"
        />
      )}
      <Input
        type="text"
        id="category-name"
        label="Name"
        value={formData.name}
        onChange={(event) =>
          setFormData({
            ...formData,
            name: event.target.value,
          })
        }
        required={true}
      />
      <Button
          type="submit"
          className="form-button"
          label={`Add ${formData.class}`}
        />
      <Button
        type="button"
        className="form-button"
        label="Close"
        onClick={props.closeModal}
      />
    </form>
  );
}
