import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";

import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { fetchCreditCards } from "../../apiUtils/creditCards";
import CreditCardForm, { CreditCard } from "./Components/CreditCardForm";

import { handleLogout } from "../../apiUtils/auth";

/**
 * The credit cards page component.
 *
 * Renders the credit cards page content.
 */
export default function CreditCards(props: CreditCardProps) {
  useAuthCheck(props.url);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);

  const fetchData = useCallback(async () => {
    const { data, status } = await fetchCreditCards();
    if (status === 200 && data) {
      setCreditCards(data);
      console.log(data);
    } else if (status === 401) {
      handleLogout(navigate);
    } else {
      console.error("Error fetching credit cards");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        label="Add Credit Card"
      />
      <Table
        headers={["Name", "Account", "Limit", "ClosingDate", "DueDate", "RemainingLimit"]}
        rows={creditCards.map((creditCard) => ({
          Name: creditCard.name,
          Account: creditCard.account,
          Limit: creditCard.limit.toString(),
          ClosingDate: creditCard.closing_date.toString(),
          DueDate: creditCard.due_date.toString(),
          RemainingLimit: creditCard.remaining_limit.toString(),
        }))}
      />
      <Button type="button" onClick={() => navigate("/")} label="Back" />
      <Modal isOpen={showModal}>
        <CreditCardForm
          closeModal={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchData();
          }}
        />
      </Modal>
      </Layout>
  );
}

interface CreditCardProps {
  url: string; // The current URL path the user is attempting to access, used for redirection after successful authentication.
}
