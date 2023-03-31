import React, { useState } from "react";
import "../../../style-sheets/Dashboard.css";
import styled from "styled-components";
import { UserData } from "../../../temp/Data";
import BarChart from "../BarChart";
import "../../../assets/css/Dashboard.css";
const CustomerGrowthChart = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#DCC29E", "#9B805B"],
        borderColor: "black",
        hoverBackgroundColor: ["#DCC29E", "#9B805B"],
      },
    ],
  });

  return (
    <div>
      <div className="bar-chart-1">
        <div className="chart-title">Messages Sent Graph</div>
        <div
          style={{
            width: "100%",
            height: "85%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <BarChart chartData={userData} />
        </div>
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
