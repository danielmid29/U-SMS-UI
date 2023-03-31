import React, { useState } from "react";
import "../../../style-sheets/Dashboard.css";
import styled from "styled-components";
import { UserData } from "../../../temp/Data";
import BarChart from "../BarChart";
import "../../../assets/css/Dashboard.css";
import LineChart from "../LineChart";
const CampaignsSent = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#DCC29E"],
        borderColor: "#9B805B",
        hoverBackgroundColor: ["#DCC29E", "#9B805B"],
      },
    ],
  });

  const BarChartTitle = styled.div`
    font-family: "Mukta", sans-serif;
    letter-spacing: 2px;
    color: #777389;
    margin-bottom: 20px;
  `;

  return (
    <div>
      <div className="bar-chart-1">
        <BarChartTitle>Customer Growth</BarChartTitle>
        <div
          style={{
            width: "100%",
            height: "85%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <LineChart chartData={userData} />
        </div>
      </div>
    </div>
  );
};

export default CampaignsSent;
