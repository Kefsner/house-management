import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../../../utils/utils";

import Layout from "../../layout/Layout";
import Modal from "../../common/Modal";
import AddCategoryForm from "./partials/AddCategoryForm";

export default function Categories(props) {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/auth");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [categoryType, setCategoryType] = useState("");

  const openModal = (action, type) => {
    setIsModalOpen(true);
    setModalAction(action);
    setCategoryType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
    setCategoryType("");
  };

  return (
    <>
      <Layout>
        <h1>Categories</h1>
        <h2>Income</h2>
        <button onClick={() => openModal("category", "Income")}>
          Add category
        </button>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>Expense</h2>
        <button onClick={() => openModal("category", "Expense")}>
          Add category
        </button>
        <button onClick={() => navigate("/finances")}>Back to finances</button>
      </Layout>
      <Modal isOpen={isModalOpen}>
        {modalAction === "category" ? (
          <AddCategoryForm type={categoryType} closeModal={closeModal} />
        ) : (
          <AddCategoryForm type={categoryType} closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}
 