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

// import { apiURL } from "./constants";

// import { handleLogout } from "./authUtils";

// // Define interfaces for data structures
// interface Transaction { /* Properties of a transaction */ }
// interface Category { /* Properties of a category */ }
// interface Account { /* Properties of an account */ }
// interface CreditCard { /* Properties of a credit card */ }
// interface CreditCardTransaction { /* Properties of a credit card transaction */ }
// interface RecurrentTransaction { /* Properties of a recurrent transaction */ }

// // Define callback types
// type SuccessCallback<T> = (data: T) => void;
// type ErrorCallback = (error: any) => void;

// export async function fetchTransactions(onSuccess: SuccessCallback<Transaction[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = "finances/transaction/get/";
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

// export async function fetchCategories(onSuccess: SuccessCallback<Category[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = "finances/category/get/";
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

// export async function fetchAccounts(onSuccess: SuccessCallback<Account[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = "finances/account/get/";
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

// export async function fetchCreditCards(onSuccess: SuccessCallback<CreditCard[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = "finances/credit_card/get/";
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

// export async function fetchCreditCardTransactions(creditCardId: number, onSuccess: SuccessCallback<CreditCardTransaction[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = `finances/credit_card/get_transactions/${creditCardId}/`;
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

// export async function fetchRecurrentTransactions(onSuccess: SuccessCallback<RecurrentTransaction[]>, onError: ErrorCallback) {
//   try {
//     const apiEndpoint = "finances/recurrent_transaction/get/";
//     const response = await fetch(`${apiURL}${apiEndpoint}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     });
//     const responseData = await response.json();
//     if (response.status === 200) {
//       onSuccess(responseData);
//     } else if (response.status === 401) {
//       await handleLogout();
//     } else if (
//       response.status === 400 ||
//       response.status === 500
//     ) {
//       onError(responseData);
//     }
//   } catch (exception) {
//     onError(exception);
//   }
// }

export {};
