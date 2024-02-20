import React from "react";

import Table from "../forms/partials/Table";
import Button from "../forms/partials/Button";

export default function Categories(props) {
  return (
    <section className="finances-categories-section">
      <Button
        className="add-button"
        onClick={() => props.openModal("add-category")}
        label="Add Category"
      />
      <Table
        title="Categories"
        headers={["Type", "Name", "Subcategories"]}
        rows={props.categories}
      />
    </section>
  );
}
