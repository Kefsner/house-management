import React from "react";

import "./Table.css";

/**
 * Properties for the table component.
 */
interface TableProps {
  headers: string[];
  rows: TableRow[];
}

/**
 * Defines the structure for each row in the table.
 */
interface TableRow {
  [key: string]: string;
}

/**
 * Renders a table component with customizable headers and rows.
 */
export default function Table(props: TableProps) {
  return (
    <table>
      <thead>
        <tr>
          {props.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => (
          <tr key={index}>
            {props.headers.map((header, index) => (
              <td key={index}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
