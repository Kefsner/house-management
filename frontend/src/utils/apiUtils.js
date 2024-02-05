import { apiURL } from "./constants";

export async function fetchCategories(transactionType, category, onSuccess, onError) {
  try {
    const apiEndpoint = category
      ? `finances/subcategory/get/?category=${encodeURIComponent(category)}&type=${transactionType[0]}`
      : `finances/category/get/?type=${transactionType[0]}`;
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 400 || response.status === 500) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}

export async function fetchTransactions(onSuccess, onError) {
  try {
    const apiEndpoint = "finances/transaction/get/";
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      onError(responseData);
    }
    else if (response.status === 400 || response.status === 500) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}

export async function fetchAccounts(onSuccess, onError) {
  try {
    const apiEndpoint = "finances/account/get/";
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      onError(responseData);
    }
    else if (response.status === 400 || response.status === 500) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}