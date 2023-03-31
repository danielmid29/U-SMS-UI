import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <Line
      data={chartData}
      options={{
        tension: "0.4",
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

export default LineChart;
