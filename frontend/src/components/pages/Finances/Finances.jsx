import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCsrfToken, isAuthenticated, logErrorToServer } from "../../../utils/utils";

import Layout from "../../layout/Layout";
import TransactionForm from "./partials/TransactionForm";
import "./Finances.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function Finances(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/auth");
        }
    }, [navigate]);

    const [transactionData, setTransactionData] = useState({
        description: "",
        value: "",
        date: new Date().toISOString().slice(0, 10),
        category: "",
        type: "",
    });

    const handleTransactionSubmit = async (event) => {
        event.preventDefault();
        const csrfToken = getCsrfToken();
        try {
            const response = await fetch(
                `${apiURL}finances/transactions/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken,
                    },
                    body: JSON.stringify(transactionData),
                }
            );
            const responseData = await response.json();
            if (response.status === 200) {
                console.log(responseData);
            } else {
                logErrorToServer(responseData, "Finances.jsx");
            }
        } catch (exception) {
            logErrorToServer(exception, "Exception in Finances.jsx");
        }
    }

  return (
    <Layout>
        <h1>Finances</h1>
        <section className="balance-section">
            <h2>Balance</h2>
        </section>
        <section className="transactions-section">
            <h2>Transactions</h2>
            <TransactionForm
                transactionData={transactionData}
                setTransactionData={setTransactionData}
                handleTransactionSubmit={handleTransactionSubmit}
            />
        </section>
    </Layout>
  );
}
