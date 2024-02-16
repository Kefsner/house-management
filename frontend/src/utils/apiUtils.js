import { apiURL } from "./constants";

import { handleLogout } from "./authUtils";

export async function fetchTransactions(onSuccess, onError) {
  try {
    const apiEndpoint = "finances/transaction/get/";
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      await handleLogout();
    } else if (
      response.status === 400 ||
      response.status === 500
    ) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}

export async function fetchCategories(onSuccess, onError) {
  try {
    const apiEndpoint = "finances/category/get/";
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      await handleLogout();
    } else if (
      response.status === 400 ||
      response.status === 500
    ) {
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
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      await handleLogout();
    } else if (
      response.status === 400 ||
      response.status === 500
    ) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}

export async function fetchCreditCards(onSuccess, onError) {
  try {
    const apiEndpoint = "finances/credit_card/get/";
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      await handleLogout();
    } else if (
      response.status === 400 ||
      response.status === 500
    ) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}

export async function fetchCreditCardTransactions(creditCardId, onSuccess, onError) {
  try {
    const apiEndpoint = `finances/credit_card/get_transactions/${creditCardId}/`;
    const response = await fetch(`${apiURL}${apiEndpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      onSuccess(responseData);
    } else if (response.status === 401) {
      await handleLogout();
    } else if (
      response.status === 400 ||
      response.status === 500
    ) {
      onError(responseData);
    }
  } catch (exception) {
    onError(exception);
  }
}