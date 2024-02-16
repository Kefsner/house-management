import React from "react";

import "./Table.css";

export default function Table(props) {
  const renderCellContent = (content) => {
    if (typeof content === "object") {
      return content.map((item) => (
        <div key={item.id} className="table-cell-content">
          {item.name || item.id }
        </div>
      ));
    }
    return content;
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {props.headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.length > 0 ? (
            props.rows.map((row) => (
              <tr key={row.id}>
                {Object.keys(row).map((key) =>
                  key === "id" ? null : (
                    <td key={`${row.id}-${key}`}>
                      {renderCellContent(row[key])}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={props.headers.length}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
