import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

/**
 * Form to add a new category or subcategory.
 */
export default function CategoryForm(props: CategoryFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    type: "", // Income or Expense
    class: "", // Category or Subcategory
    category: "", // If class is subcategory, this is the parent category else it's empty
    name: "", // Name of the category or subcategory
    user: localStorage.getItem("username"), // User creating the category
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const apiEndpoint = `categories/${formData.class}/create/`;
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData: ResponseData = await response.json();
      console.log(responseData);
      if (response.status === 201) {
        setFormData({
          type: "",
          class: "",
          category: "",
          name: "",
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
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-form">
      <Select
        id="category-category-type"
        value={formData.class}
        onChange={(event) => {
          const value = event.target.value;
          if (value === "category" || value === "subcategory") {
            setFormData({
              ...formData,
              class: value,
            });
          } else {
            console.error("Invalid class type");
          }
        }}
        label="Category or Subcategory"
        placeholder="Select class"
        options={[
          { id: "category", value: "category", label: "Category" },
          { id: "subcategory", value: "subcategory", label: "Subcategory" },
        ]}
        required={true}
      />
      <Select
        id="category-transaction-type"
        value={formData.type}
        onChange={(event) => {
          const value = event.target.value;
          if (value === "income" || value === "expense") {
            setFormData({
              ...formData,
              type: value,
            });
          } else {
            console.error("Invalid transaction type");
          }
        }}
        label="Income or Expense"
        placeholder="Select type"
        options={[
          { id: "income", value: "income", label: "Income" },
          { id: "expense", value: "expense", label: "Expense" },
        ]}
        required={true}
      />
      {formData.class === "subcategory" && (
        <Select
          id="category-category"
          value={formData.category}
          onChange={(event) =>
            setFormData({
              ...formData,
              category: event.target.value,
            })
          }
          label="Category"
          placeholder="Select category"
          options={props.categories.map((category) => ({
            id: category.id,
            value: category.id,
            label: category.name,
          }))}
          required={true}
        />
      )}
      <Input
        type="text"
        id="category-name"
        value={formData.name}
        onChange={(event) =>
          setFormData({
            ...formData,
            name: event.target.value,
          })
        }
        label="Name"
        required={true}
      />
      <Button type="submit" label={`Add ${formData.class}`} />
      <Button type="button" label="Close" onClick={props.closeModal} />
    </form>
  );
}

interface CategoryFormProps {
  closeModal: () => void;
  onSuccess: () => void;
  categories: Category[];
}

interface FormData {
  type: "income" | "expense" | "";
  class: "category" | "subcategory" | "";
  category: string;
  name: string;
  user: string | null;
}

interface ResponseData {
  message: string;
}

export interface Category {
  id: string;
  name: string;
  type: string;
  user: string;
}