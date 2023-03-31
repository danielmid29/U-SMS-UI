import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          x: {
            grid: {
              borderWidth: 5,
              drawBorder: true,
              display: false,
            },
          },
          y: {
            grid: {
              borderWidth: 5,
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default BarChart;
