import React from "react";
import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import Layout from "../../components/layout/Layout";
import Button from "../../components/common/Button";

import "./Finances.css";

export default function Finances(props: FinancesProps) {
  useAuthCheck(props.url);

  const navigate = useNavigate();
  return (
    <Layout>
      <Button type="button" onClick={() => navigate("/")} label="Back" />
    </Layout>
  );
}

interface FinancesProps {
  url: string;
}
