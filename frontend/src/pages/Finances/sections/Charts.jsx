import React from "react";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const INCOME_COLORS = ["#4daf7c", "#6b8dae", "#a1887f"];

const EXPENSE_COLORS = ["#d9534f", "#ff7043", "#bdbdbd"];

const pie_chart_width = 250;
const pie_chart_height = 250;
const chart_text_x = 125;
const chart_text_y = 100;
const chart_span_dy = 30;

const aggregateData = (data, property) => {
  const aggregatedData = data.reduce((acc, transaction) => {
    if (acc[transaction[property]]) {
      acc[transaction[property]].value += transaction.value;
    } else {
      acc[transaction[property]] = {
        category: transaction[property],
        value: transaction.value,
      };
    }
    return acc;
  }, {});
  return Object.values(aggregatedData);
};

export default function Charts(props) {
  const income = props.incomeData
    .reduce((acc, transaction) => acc + transaction.value, 0)
    .toFixed(2);

  const expense = props.expenseData
    .reduce((acc, transaction) => acc + transaction.value, 0)
    .toFixed(2);

  return (
    <section className="finances-charts-section">
      <div className="income-chart">
        <PieChart width={pie_chart_width} height={pie_chart_height}>
          <text
            x={chart_text_x}
            y={chart_text_y}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan className="pie-chart-label">Income</tspan>
            <tspan
              className="pie-chart-value income"
              x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${income}`}</tspan>
          </text>
          <Pie
            data={aggregateData(props.incomeData, "category")}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
          >
            {props.incomeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={INCOME_COLORS[index % INCOME_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="balance-chart">
        <PieChart width={pie_chart_width} height={pie_chart_height}>
          <text
            x={chart_text_x}
            y={chart_text_y}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan className="pie-chart-label">Balance</tspan>
            <tspan
              className="pie-chart-value balance"
              x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${(income - expense).toFixed(2)}`}</tspan>
          </text>
          <Pie
            data={[
              { name: "Income", value: income },
              { name: "Expense", value: expense },
            ]}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
          >
            <Cell key={`cell-0`} fill={INCOME_COLORS[0]} />
            <Cell key={`cell-1`} fill={EXPENSE_COLORS[0]} />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      <div className="expense-chart">
        <PieChart width={pie_chart_width} height={pie_chart_height}>
          <text
            x={chart_text_x}
            y={chart_text_y}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan className="pie-chart-label">Expense</tspan>
            <tspan
              className="pie-chart-value expense"
              x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${expense}`}</tspan>
          </text>
          <Pie
            data={aggregateData(props.expenseData, "category")}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
          >
            {props.expenseData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </section>
  );
}
