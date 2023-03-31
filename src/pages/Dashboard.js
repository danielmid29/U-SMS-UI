import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "chart.js/auto";
import CustomerGrowthChart from "./sub-components/DashBoardComponents/CustomerGrowth";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import "../assets/css/Dashboard.css";
import CampaignsSent from "./sub-components/DashBoardComponents/CustomerGrowth copy";

const Dashboard1 = () => {
  const [chartOnCard, setchartOnCard] = useState(window.innerWidth > 800);

  const detectSize = () => {
    if (window.innerWidth > 1110) setchartOnCard(true);
    if (window.innerWidth < 1110) setchartOnCard(false);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  return (
    <div className="dashboard-main-container">
      <ContentContainer>
        {/* <div className="dashboard-title">Welcome Jerry</div> */}
        <div>
          <div>
            <CardContainer chartOnCard={chartOnCard} />
            <div className="chart-container-1">
              <CustomerGrowthChart />
              <CampaignsSent />
            </div>
            <div className="chart-container-1">
              <CampaignsSent />
              <CustomerGrowthChart />
            </div>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Dashboard1;

const ContentContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 15px;
`;

const CardContainer = ({ chartOnCard }) => {
  return (
    <div className="card-main-container">
      <div className="left-container" id="left">
        <div className="card">
          <div className="card-icon-link">
            <AiIcons.AiOutlineTeam className="card-icon" />
          </div>
          <div className="card-left-container">
            <div className="card-text">Contacts : 5</div>
          </div>
        </div>
        <div className="card">
          <div className="card-icon-link">
            <BiIcons.BiBookContent className="card-icon" />
          </div>
          <div className="card-left-container">
            <div className="card-text">SMS Sent : 10</div>
          </div>
        </div>
      </div>
      <div className="card" id="centre-card">
        <div className="card-icon-link">
          <BiIcons.BiBookContent className="card-icon" />
        </div>
        <div className="card-left-container">
          <div className="card-text">Total Users : 10</div>
        </div>
      </div>
      <div className="right-container" id="right">
        <div className="card">
          <div className="card-icon-link">
            <BiIcons.BiChat className="card-icon" />
          </div>
          <div className="card-left-container">
            <div className="card-text">SMS Recieved : 456</div>
          </div>
        </div>
        <div className="card">
          <div className="card-icon-link">
            <BiIcons.BiCollection className="card-icon" />
          </div>
          <div className="card-left-container">
            <div className="card-text">Campaigns Sent : 56</div>
          </div>
        </div>
      </div>
    </div>
  );
};
