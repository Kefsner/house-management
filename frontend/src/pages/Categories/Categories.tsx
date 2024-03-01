import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";

import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { fetchCategories } from "../../utils/apiUtils";
import CategoryForm, { Category } from "./Components/CategoryForm";

import "./Categories.scss";
import { handleLogout } from "../../utils/authUtils";

/**
 * The categories page component.
 * 
 * Renders the categories page content.
 */
export default function Categories(props: CategoriesProps) {
    useAuthCheck(props.url)
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, status } = await fetchCategories();
            if (status === 200 && data) {
                setCategories(data);
            } else if (status === 401) {
                handleLogout(navigate);
            } else {
                console.error("Error fetching categories");
            }
        }
        fetchData();
    }, [navigate]);

  return (
    <>
    <Layout>
        <div id="categories-page">
            <Button
                type="button"
                onClick={() => setShowModal(true)}
                label="Add Category"
            />
            <Table
            headers={["Name", "Type"]}
            rows={[
                { Name: "Food", Type: "Expense" },
                { Name: "Utilities", Type: "Expense" },
                { Name: "Salary", Type: "Income" },
                { Name: "Freelance", Type: "Income" },
            ]}
            />
        </div>
        <Modal
            isOpen={showModal}
        >
            <CategoryForm
                closeModal={() => setShowModal(false)}
                onSuccess={() => setShowModal(false)}
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