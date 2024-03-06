import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";

import Table from "../../components/common/Table";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { fetchAccounts } from "../../apiUtils/accounts";
import AccountForm, { Account } from "./Components/AccountForm";

import { handleLogout } from "../../apiUtils/auth";

/**
 * The accounts page component.
 *
 * Renders the accounts page content.
 */
export default function Accounts(props: AccountProps) {
  useAuthCheck(props.url);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
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

  return (
    <Layout>
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        label="Add Account"
      />
      <Table
        headers={["Name", "Balance", "Owner"]}
        rows={accounts.map((account) => ({
          Name: account.name,
          Balance: account.balance,
          Owner: account.user,
        }))}
      />
      <Button type="button" onClick={() => navigate("/")} label="Back" />
      <Modal isOpen={showModal}>
        <AccountForm
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

interface AccountProps {
  url: string; // The current URL path the user is attempting to access, used for redirection after successful authentication.
}
