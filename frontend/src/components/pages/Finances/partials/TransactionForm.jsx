import React, { useState, useEffect, useCallback } from "react";

import Modal from "../../../../components/common/Modal";

import { logErrorToServer } from "../../../../utils/utils";

import "./TransactionForm.css";
import AddCategoryForm from "./AddCategoryForm";

const apiURL = process.env.REACT_APP_API_URL;

export default function TransactionForm(props) {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);

  const openModal = (action) => {
    setIsModalOpen(true);
    setModalAction(action);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiURL}finances/category/get/?type=${props.transactionData.type}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.status === 200) {
        setCategories(responseData);
      } else if (response.status === 400 || response.status === 500) {
        logErrorToServer(responseData, "TransactionForm.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in TransactionForm.jsx");
    }
  }, [props.transactionData.type]);

  useEffect(() => {
    if (props.transactionData.type) {
      fetchCategories();
    }
  }, [props.transactionData.type, fetchCategories]);

  const fetchSubcategories = useCallback(async () => {
    if (!props.transactionData.category) {
      setSubcategories([]);
      return;
    }

    const apiEndpoint = `finances/subcategory/get/?category=${props.transactionData.category}&type=${props.transactionData.type}`;

    try {
      const response = await fetch(
        `${apiURL}${apiEndpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const responseData = await response.json();
      if (response.status === 200) {
        setSubcategories(responseData);
      } else if (response.status === 400 || response.status === 500) {
        logErrorToServer(responseData, "TransactionForm.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in TransactionForm.jsx");
    }
  }, [props.transactionData.category, props.transactionData.type]);

  useEffect(() => {
    fetchSubcategories();
  }, [props.transactionData.category, props.transactionData.type, fetchSubcategories]);

  return (
    <>
      <form
        onSubmit={props.handleTransactionSubmit}
        className="add-transaction-form"
      >
        <label htmlFor="type" className="add-transaction-label">
          Type
        </label>
        <select
          id="type"
          className="add-transaction-input"
          autoComplete="off"
          value={props.transactionData.type}
          onChange={(event) =>
            props.setTransactionData({
              ...props.transactionData,
              type: event.target.value,
            })
          }
          required={true}
        >
          <option value="" disabled hidden>
            Select a type
          </option>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
        {props.transactionData.type && (
          <>
        <label htmlFor="category" className="add-transaction-label">
          Category
        </label>
        <div className="add-transaction-category-container">
          <select
            id="category"
            className="add-transaction-select"
            autoComplete="off"
            value={props.transactionData.category}
            onChange={(event) =>
              props.setTransactionData({
                ...props.transactionData,
                category: event.target.value,
              })
            }
            required={true}
          >
            <option value="" disabled hidden>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-transaction-button-add-category"
            onClick={() => openModal("category")}
          >
            Add new
          </button>
        </div>
        </>
        )}
        {props.transactionData.category && (
          <>
        <label htmlFor="subcategory" className="add-transaction-label">
          Subcategory
        </label>
        <div className="add-transaction-category-container">
          <select
            id="subcategory"
            className="add-transaction-select"
            autoComplete="off"
            value={props.transactionData.subcategory}
            onChange={(event) =>
              props.setTransactionData({
                ...props.transactionData,
                subcategory: event.target.value,
              })
            }
            required={true}
          >
            <option value="" disabled hidden>
              Select a subcategory
            </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-transaction-button-add-category"
            onClick={() => openModal("subcategory")}
          >
            Add new
          </button>
        </div>
        </>
        )}
        <label htmlFor="description" className="add-transaction-label">
          Description
        </label>
        <input
          type="text"
          id="description"
          className="add-transaction-input"
          value={props.transactionData.description}
          onChange={(event) =>
            props.setTransactionData({
              ...props.transactionData,
              description: event.target.value,
            })
          }
          autoFocus={true}
          required={true}
          minLength={3}
          maxLength={50}
          />
        <label htmlFor="value" className="add-transaction-label">
          Value
        </label>
        <input
          type="number"
          id="value"
          className="add-transaction-input"
          step="0.01"
          value={props.transactionData.value}
          onChange={(event) =>
            props.setTransactionData({
              ...props.transactionData,
              value: event.target.value,
            })
          }
          required={true}
          min={0}
        />
        <label htmlFor="date" className="add-transaction-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          className="add-transaction-input"
          autoComplete="off"
          value={props.transactionData.date}
          onChange={(event) =>
            props.setTransactionData({
              ...props.transactionData,
              date: event.target.value,
            })
          }
          required={true}
        />
        <button type="submit" className="add-transaction-button">
          Add transaction
        </button>
      </form>
      <Modal isOpen={isModalOpen}>
        {modalAction === "category" ? (
          <AddCategoryForm
            type={props.transactionData.type}
            onCategoryAdded={fetchCategories}
            closeModal={closeModal}
          />
        ) : (
          <AddCategoryForm
            type={props.transactionData.type}
            category={props.transactionData.category}
            onCategoryAdded={fetchSubcategories}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
