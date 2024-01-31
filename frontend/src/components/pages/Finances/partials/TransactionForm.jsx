import React, { useState, useEffect } from "react";

import Modal from "../../../common/Modal";

import { logErrorToServer, fetchCategories } from "../../../../utils/utils";

import "./TransactionForm.css";
import AddCategoryForm from "./AddCategoryForm";

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

  useEffect(() => {
    if (!props.transactionData.type) {
      setCategories([]);
      return;
    }
    const onSuccess = (data) => {
      setCategories(data);
    };
    const onError = (error) => {
      logErrorToServer(error, "TransactionForm.jsx");
    };
    fetchCategories(props.transactionData.type, null, onSuccess, onError);
  }, [props.transactionData.type]);

  useEffect(() => {
    if (!props.transactionData.category) {
      setSubcategories([]);
      return;
    }
    const onSuccess = (data) => {
      setSubcategories(data);
    };
    const onError = (error) => {
      logErrorToServer(error, "TransactionForm.jsx");
    };
    fetchCategories(props.transactionData.type, props.transactionData.category, onSuccess, onError);
  }, [props.transactionData.type, props.transactionData.category]);

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
              category: "",
              subcategory: "",
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
            onCategoryAdded={() => fetchCategories(props.transactionData.type, null, setCategories, logErrorToServer)}
            closeModal={closeModal}
          />
        ) : (
          <AddCategoryForm
            type={props.transactionData.type}
            category={props.transactionData.category}
            onCategoryAdded={() => fetchCategories(props.transactionData.type, props.transactionData.category, setSubcategories, logErrorToServer)}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
}
