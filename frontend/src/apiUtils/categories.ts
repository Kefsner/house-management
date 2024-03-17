import { apiURL } from "./constants";
import { Category } from "../pages/Categories/Components/CategoryForm";

export async function fetchCategories(): Promise<{data: Category[] | null, status: number}> {
    try {
        const response = await fetch(`${apiURL}categories/get/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
        const responseData = await response.json();
        return { data: response.ok ? responseData : null, status: response.status };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { data: null, status: 500 };
    }
}
