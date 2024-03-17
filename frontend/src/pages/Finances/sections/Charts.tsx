import React from "react";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { Transaction } from "../../Accounts/Components/TransactionForm";

const INCOME_COLORS = ["#4daf7c", "#6b8dae", "#a1887f"];

const EXPENSE_COLORS = ["#d9534f", "#ff7043", "#bdbdbd"];

const pie_chart_width = 250;
const pie_chart_height = 250;
const chart_text_x = 125;
const chart_text_y = 100;
const chart_span_dy = 30;

interface AggregatedDataItem {
  category: string;
  value: number;
}

const aggregateData = (data: Transaction[], property: keyof Transaction): AggregatedDataItem[] => {
  const aggregation = data.reduce((acc: Record<string, AggregatedDataItem>, transaction: Transaction) => {
    const key = transaction[property];
    if (typeof key === 'string') { // Ensuring the property is a string
      if (!acc[key]) {
        acc[key] = { category: key, value: 0 };
      }
      acc[key].value += transaction.value;
    } else {
      console.error('Property is not a string', key);
    }
    return acc;
  }, {} as Record<string, AggregatedDataItem>);

  return Object.values(aggregation);
};


export default function Charts(props: ChartsProps) {
  // Calculate totals as numbers
const totalIncome = props.incomeData.reduce((acc, transaction) => acc + transaction.value, 0);
const totalExpense = props.expenseData.reduce((acc, transaction) => acc + transaction.value, 0);

// Convert to string only when displaying
const incomeDisplay = totalIncome.toFixed(2);
const expenseDisplay = totalExpense.toFixed(2);

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
              className="pie-chart-value green"
              x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${incomeDisplay}`}</tspan>
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
            <tspan className="pie-chart-label"
            >Balance</tspan>
            <tspan
              className={`pie-chart-value ${totalIncome - totalExpense >= 0 ? "green" : "red"}`}             x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${(totalIncome - totalExpense).toFixed(2)}`}</tspan>
          </text>
          <Pie
            data={[
              { name: "Income", value: totalIncome },
              { name: "Expense", value: totalExpense },
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
              className="pie-chart-value red"
              x={chart_text_x}
              dy={chart_span_dy}
            >{`R$ ${expenseDisplay}`}</tspan>
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


interface ChartsProps {
  incomeData: Transaction[];
  expenseData: Transaction[];
}