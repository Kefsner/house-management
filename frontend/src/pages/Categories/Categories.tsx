import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";

import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { fetchCategories } from "../../apiUtils/categories";
import CategoryForm, { Category } from "./Components/CategoryForm";

import { handleLogout } from "../../apiUtils/auth";

/**
 * The categories page component.
 *
 * Renders the categories page content.
 */
export default function Categories(props: CategoriesProps) {
  useAuthCheck(props.url);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchData = useCallback(async () => {
    const { data, status } = await fetchCategories();
    if (status === 200 && data) {
      setCategories(data);
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching categories");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Layout>
        <Button
          type="button"
          onClick={() => setShowModal(true)}
          label="Add Category"
        />
        <Table
          headers={["Name", "Type", "Subcategories"]}
          rows={categories.map((category) => ({
            Name: category.name,
            Type: category.type,
            Subcategories: category.subcategories
              .map((sub) => sub.name)
              .join(", "),
          }))}
        />
        <Button type="button" onClick={() => navigate("/")} label="Back" />
        <Modal isOpen={showModal}>
          <CategoryForm
            closeModal={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              fetchData();
            }}
            categories={categories}
          />
        </Modal>
      </Layout>
    </>
  );
}

/**
 * Props for the Categories component.
 */
interface CategoriesProps {
  url: string; // The current URL path the user is attempting to access, used for redirection after successful authentication.
}
