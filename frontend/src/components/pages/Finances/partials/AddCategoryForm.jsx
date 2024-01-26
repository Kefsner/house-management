import React, { useState } from "react";

import { getCsrfToken, logErrorToServer } from "../../../../utils/utils";

const apiURL = process.env.REACT_APP_API_URL;
export default function AddCategoryForm(props) {
    const [categoryData, setCategoryData] = useState({
        type: "",
        description: "",
    });

    const handleCategorySubmit = async (event) => {
        event.preventDefault();
        const csrfToken = getCsrfToken();
        try {
            const response = await fetch(
                `${apiURL}finances/category/create/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify(categoryData),
                }
            );
            const responseData = await response.json();
            if (response.status === 200) {
                console.log("Transaction created successfully");
            } else {
                logErrorToServer(responseData, "Finances.jsx");
            }
        } catch (exception) {
            logErrorToServer(exception, "Exception in Finances.jsx");
        }
    }
    return (
        <form onSubmit={handleCategorySubmit}>
            <label htmlFor="type">Type</label>
            <select
                id="type"
                value={categoryData.type}
                onChange={(event) => setCategoryData({ ...categoryData, type: event.target.value })}
            >
                <option value="">Select type</option>
                <option value="I">Income</option>
                <option value="E">Expense</option>
            </select>
            <label htmlFor="description">Description</label>
            <input
                type="text"
                id="description"
                value={categoryData.description}
                onChange={(event) => setCategoryData({ ...categoryData, description: event.target.value })}
            />
            <button type="submit">Add Category</button>
        </form>
    );
}