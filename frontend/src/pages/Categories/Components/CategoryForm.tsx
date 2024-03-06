import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../apiUtils/auth";
import { apiURL } from "../../../apiUtils/constants";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

/**
 * Form to add a new category or subcategory.
 */
export default function CategoryForm(props: CategoryFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CategoryFormData>({
    type: "",
    class: "",
    category: "",
    name: "",
    description: "",
    user: localStorage.getItem("username"),
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const apiEndpoint =
      "categories/" +
      (formData.category && `sub/${formData.category}/`) +
      "create/";
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(formData),
      });
      const responseData: CategoryResponseData = await response.json();
      console.log(responseData);
      if (response.status === 201) {
        setFormData({
          type: "",
          class: "",
          category: "",
          name: "",
          description: "",
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
          options={props.categories
            .filter((category) => category.type === formData.type)
            .map((category) => {
              return {
                id: category.id,
                value: category.id,
                label: category.name,
              };
            })}
          required
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
        required
      />
      {formData.class === "subcategory" && (
        <Input
          type="text"
          id="category-description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
          label="Description"
          required={true}
        />
      )}
      <Button type="submit" label={`Add ${formData.class}`} />
      <Button type="button" label="Close" onClick={props.closeModal} />
    </form>
  );
}

/**
 * The props for the CategoryForm component.
 */
interface CategoryFormProps {
  closeModal: () => void; // Function to close the modal
  onSuccess: () => void; // Function to execute on successful form submission e.g. updating the categories list
  categories: Category[]; // List of categories to populate the category select input
}

/**
 * The data structure for the form data.
 */
interface CategoryFormData {
  type: "income" | "expense" | ""; // Income or Expense
  class: "category" | "subcategory" | ""; // Category or Subcategory
  category: string; // If class is subcategory, this is the parent category else it's empty
  name: string; // Name of the category or subcategory
  description: string; // Description for subcategory
  user: string | null; // User creating the category
}

/**
 * The data structure for the server response.
 */
interface CategoryResponseData {
  message: string; // Message from the server
}

/**
 * The data structure for a category.
 */
export interface Category {
  id: string; // Unique identifier
  name: string; // Name of the category
  type: string; // Income or Expense
  subcategories: Subcategory[]; // List of subcategories
}

/**
 * The data structure for a subcategory.
 */
export interface Subcategory {
  id: string; // Unique identifier
  name: string; // Name of the subcategory
}
