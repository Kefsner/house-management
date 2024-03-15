import React, { useState, FormEvent, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { getCsrfToken, handleLogout } from "../../../apiUtils/auth";
import { apiURL } from "../../../apiUtils/constants";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

import { fetchAccounts } from "../../../apiUtils/accounts";
import { Account } from "../../Accounts/Components/AccountForm";

/**
 * Form to add a new credit card.
 */
export default function CreditCardForm(props: CreditCardFormProps) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CreditCardFormData>({
        name: "",
        account: "",
        limit: "",
        due_day: "",
        created_by: localStorage.getItem("username"),
    });
    const [accounts, setAccounts] = useState<Account[]>([]);

    const fetchData = useCallback(async () => {
        const { data, status } = await fetchAccounts();
        if (status === 200 && data) {
            setAccounts(data);
        } else if (status === 401) {
            handleLogout(navigate);
        } else {
            console.error("Error fetching accounts");
        }
    }, [navigate]);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault();
        try {
            const response = await fetch(`${apiURL}credit_cards/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCsrfToken(),
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(formData),
            });
            const responseData: CreditCardResponseData = await response.json();
            console.log(responseData);
            if (response.status === 201) {
                setFormData({
                    ...formData,
                    name: "",
                    account: "",
                    limit: "",
                    due_day: "",
                });
                props.onSuccess();
                props.closeModal();
            } else if (response.status === 401) {
                await handleLogout(navigate);
            } else if (
                response.status === 400 ||
                response.status === 409 ||
                response.status === 500
            ) {
                console.log("Error:");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-form">
            <Input
                type="text"
                id="credit-card-name"
                value={formData.name}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        name: event.target.value,
                    })
                }
                label="Name"
                required
            />
            <Select
                id="credit-card-account"
                value={formData.account}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        account: event.target.value,
                    })
                }
                label="Account"
                placeholder="Select account"
                options={accounts.map((account) => ({
                    id: account.id.toString(),
                    value: account.id.toString(),
                    label: account.name,
                }))}
                required
            />
            <Input
                type="number"
                id="credit-card-limit"
                value={formData.limit}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        limit: event.target.value,
                    })
                }
                label="Limit"
                required
                min={0}
                step={0.01}
            />
            <Input
                type="number"
                id="credit-card-due-day"
                value={formData.due_day}
                onChange={(event) =>
                    setFormData({
                        ...formData,
                        due_day: event.target.value,
                    })
                }
                label="Due Day"
                required
                min={1}
                step={1}
            />
            <Button type="submit" label="Add Credit Card" />
            <Button type="button" label="Cancel" onClick={props.closeModal} />
        </form>
    );
}

/**
 * Props for CreditCardForm component.
 */
interface CreditCardFormProps {
    closeModal: () => void;
    onSuccess: () => void;
}

/**
 * Defines the structure for form data used in the CreditCardForm.
 */
interface CreditCardFormData {
    name: string;
    account: string;
    limit: string;
    due_day: string;
    created_by: string | null;
}

/**
 * The data structure for the server response.
 */
interface CreditCardResponseData {
    message: string;
}

/**
 * The data structure for the credit card.
 */
export interface CreditCard {
    id: number;
    name: string;
    account: string;
    limit: number;
    closing_date: number;
    due_date: number;
    remaining_limit: number;
}


