import { apiURL } from "./constants";
import { CreditCard } from "../pages/CreditCards/Components/CreditCardForm";

export async function fetchCreditCards(): Promise<{
  data: CreditCard[] | null;
  status: number;
}> {
  try {
    const response = await fetch(`${apiURL}credit_cards/get/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    return { data: response.ok ? responseData : null, status: response.status };
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    return { data: null, status: 500 };
  }
}
