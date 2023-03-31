import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import Navbar from "../components/NavBar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../assets/css/Campaign.css";
import CampaignBuilder from "./sub-components/CampaignBuilder";
import AssignSender from "./sub-components/AssignSender";

export const SenderCart = () => {
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"sender"} />
      <Buttons />
      <SenderCartTableCard />
    </div>
  );
};

export default SenderCart;

const Buttons = () => {
  const [actionsDrop, setActionsDrop] = useState(false);

  const showAction = () => setActionsDrop(!actionsDrop);
  return (
    <div className="button-container">
      <Link to="/sender" className="button">
        <div>Go Back</div>
        <BiIcons.BiArrowBack className="top-button-icon" />
      </Link>
    </div>
  );
};

const SenderCartTableCard = () => {
  const [senderType, setSenderType] = useState("local");
  const [user, setUse] = useState("");

  const [senderCartDetails, setSenderCartDetails] = useState(null);

  const getSenderCartDetails = (type) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/sender/search-cart?" +
        new URLSearchParams({
          type: type,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        if (data.objects?.length > 0) {
          setSenderCartDetails(data.objects);
        } else setSenderCartDetails([{ region: "No Details Present" }]);
      })
      .catch(setSenderCartDetails([{ region: "Loading ..." }]));
  };

  useEffect(() => {
    getSenderCartDetails("local");
  }, []);

  const changeSenderType = (event) => {
    setSenderType(event.target.value);
    getSenderCartDetails(event.target.value);
  };

  const refreshSenderDetails = () => getSenderCartDetails(senderType);

  return (
    <div className="table-container">
      <div className="table-top-div">
        <div className="dropdown-container">
          <select
            className="sender-type-drop-down"
            defaultValue={"Local"}
            onChange={changeSenderType}
          >
            <option value="local">Local</option>
            <option value="tollfree">Toll Free</option>
          </select>
        </div>
      </div>
      <SenderTable
        senderDetails={senderCartDetails}
        type={senderType}
        assignedTo={user}
        refreshSenderDetails={refreshSenderDetails}
      />
      <div className="table-bottom-div"></div>
    </div>
  );
};

const SenderTable = ({
  refreshSenderDetails,
  senderDetails,
  type,
  assignedTo,
}) => {
  const buySender = (number, type, assignedTo) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      number: number,
      type: type,
      assignedTo: "pramoi",
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/sender/buy",
      {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        refreshSenderDetails();
      })
      .catch();
  };

  const [sender, setSender] = useState();

  const handleBuyNumber = (number) => {
    setSender(number);
    setOpenAs(true);
  };

  const [openAS, setOpenAs] = useState();

  const toggleOpenAs = () => setOpenAs(!openAS);

  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "200px", paddingLeft: "60px" }}
          >
            Number
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px" }}
          >
            City
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px" }}
          >
            Region
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px" }}
          >
            Country
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px" }}
          >
            Action
          </div>
        </div>
        <div className="table-row-container">
          <AssignSender
            openAS={openAS}
            toggleOpenAs={toggleOpenAs}
            type={type}
            sender={sender}
            refreshSenderDetails={refreshSenderDetails}
          />
          {senderDetails?.map((detail, index) => (
            <div className="table-row" key={detail.id}>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "200px", paddingLeft: "60px" }}
              >
                {detail.number}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "170px" }}
              >
                {detail.city}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "170px" }}
              >
                {detail.region}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "170px" }}
              >
                {detail.country}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "170px" }}
              >
                <div
                  to="#"
                  className="table-row-link"
                  onClick={() => handleBuyNumber(detail.number)}
                >
                  {`${detail.number === undefined ? `` : `Buy`}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </table>
    </div>
  );
};
