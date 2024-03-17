import { apiURL } from "./constants";
import { Account } from "../pages/Accounts/Components/AccountForm";
import { Transaction } from "../pages/Accounts/Components/TransactionForm";

export async function fetchAccounts(): Promise<{
  data: Account[] | null;
  status: number;
}> {
  try {
    const response = await fetch(`${apiURL}accounts/get/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    return { data: response.ok ? responseData : null, status: response.status };
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return { data: null, status: 500 };
  }
}

export async function fetchTransactions(): Promise<{
  data: Transaction[] | null;
  status: number;
}> {
  try {
    const response = await fetch(`${apiURL}accounts/transaction/get/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    return { data: response.ok ? responseData : null, status: response.status };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { data: null, status: 500 };
  }
}
