import React, { useState, useEffect } from "react";
import { getCsrfToken } from "../../../utils/authUtils";
import { apiURL } from "../../../utils/constants";

import { fetchCategories } from "../../../utils/apiUtils";

export default function AddCategoryForm(props) {
  const [categories, setCategories] = useState([]);
    useEffect(() => {
        const onSuccess = (data) => {
            setCategories(data);
        };
        const onError = (error) => {
            console.error("Error:", error);
        };
        fetchCategories(null, null, onSuccess, onError);
    }, []);
  const [categoryFormData, setCategoryFormData] = useState({
    type: "",
    name: "",
    user: localStorage.getItem("username"),
    category: "category",
    subcategory: "",
  });

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCsrfToken();
    const apiEndpoint = categoryFormData.subcategory ? "finances/subcategory/create/" : "finances/category/create/";
    console.log(apiEndpoint)

    try {
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(categoryFormData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        props.closeModal();
      } else if (
        response.status === 400 ||
        response.status === 409 ||
        response.status === 500
      ) {
        console.log(responseData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleCategorySubmit} className="form-form">
    <div className="form-radio-container">
        <div className="form-radio-option">
            <label htmlFor="category-radio" className="form-radio-label">
                Category
            </label>
            <input
                type="radio"
                id="category-radio"
                name="category"
                value="category"
                checked={categoryFormData.category === "category"}
                onChange={(event) =>
                    setCategoryFormData({
                    ...categoryFormData,
                    category: event.target.value,
                    subcategory: "",
                    })
                }
            />
        </div>
        <div className="form-radio-option">
            <label htmlFor="subcategory-radio" className="form-radio-label">
                Subcategory
            </label>
            <input
                type="radio"
                id="subcategory-radio"
                name="subcategory"
                value="subcategory"
                checked={categoryFormData.subcategory === "subcategory"}
                onChange={(event) =>
                    setCategoryFormData({
                    ...categoryFormData,
                    category: "",
                    subcategory: event.target.value,
                    })
                }
            />
        </div>
    </div>
      <label htmlFor="type" className="form-label">
        Type
      </label>
      <select
        id="type"
        className="form-input"
        value={categoryFormData.type}
        onChange={(event) =>
            setCategoryFormData({
                ...categoryFormData,
                type: event.target.value,
            })
            }
        required
      >
        <option value="" disabled hidden>
          Select type
        </option>
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>
    {categoryFormData.subcategory && (
        <>
        <label htmlFor="category" className="form-label">
            Category
        </label>
        <select
            id="category"
            className="form-input"
            value={categoryFormData.category}
            onChange={(event) =>
                setCategoryFormData({
                ...categoryFormData,
                category: event.target.value,
                })
            }
            required
        >
            <option value="" disabled hidden>
                Select category
            </option>
            {categories
                .filter((category) => category.type === categoryFormData.type[0])
                .map((category) => (
                <option key={category.id} value={category.name}>
                    {category.name}
                </option>
                ))}
        </select>
        </>
    )}
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="form-input"
        value={categoryFormData.name}
        onChange={(event) =>
          setCategoryFormData({
            ...categoryFormData,
            name: event.target.value,
          })
        }
        required={true}
      />
        <button type="submit" className="form-button">
            Save
        </button>
      <button type="button" className="form-button" onClick={props.closeModal}>
        Close
      </button>
    </form>
  );
}
