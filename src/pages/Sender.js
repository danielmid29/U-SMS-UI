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

export const Sender = () => {
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"sender"} />
      <Buttons />
      <SenderTableCard />
    </div>
  );
};

const Buttons = () => {
  const [actionsDrop, setActionsDrop] = useState(false);

  const showAction = () => setActionsDrop(!actionsDrop);
  return (
    <div className="button-container">
      {actionsDrop && (
        <div className="dummy-div-actions" onClick={showAction}></div>
      )}
      <Link to="/sender-cart" className="button">
        <div>Buy Number</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
      </Link>
      {/* <div className="button" onClick={showAction}>
        <div>Request New</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
        {actionsDrop && (
          <div className="s-request-drop-down">
            <div className="s-action-drop-down-options">Local Number</div>
            <div className="s-action-drop-down-options">Toll Free</div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Sender;

const SenderTableCard = () => {
  const [recordCount, setRecordCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [senderDetails, setSenderDetails] = useState(null);

  const fetchSenderDetails = (user, recordCount, searchValue, pageNumber) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/sender?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          assignedTo: user,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        if (data.senderList?.length > 0) {
          setSenderDetails(data.senderList);
          setTotalPage(data.totalPage);
        } else setSenderDetails([{ status: "No Details Present" }]);
      })
      .catch(setSenderDetails([{ status: "Loading ..." }]));
  };

  useEffect(() => {
    fetchSenderDetails(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeRecordCount = (event) => {
    setRecordCount(event.target.value);
    fetchSenderDetails(user, event.target.value, searchValue, pageNumber);
  };

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    fetchSenderDetails(user, recordCount, event.target.value, pageNumber);
  };

  const PageOptions = () => {
    var options = [],
      i = 0,
      len = totalPage;
    while (++i <= len) options.push(i);
    return (
      <select
        className="page-drop-down"
        onChange={handlePageChange}
        value={pageNumber}
      >
        {options.map(function (i) {
          return (
            <option value={i} key={i}>
              {i}
            </option>
          );
        })}
        {options}
      </select>
    );
  };

  const handlePageChange = (e) => {
    fetchSenderDetails(user, recordCount, searchValue, e.target.value);
    setPageNumber(e.target.value);
  };

  const refreshSenderDetails = () =>
    fetchSenderDetails(user, recordCount, searchValue, pageNumber);

  return (
    <div className="table-container">
      <div className="table-top-div">
        <div className="dropdown-container">
          <select
            className="count-drop-down"
            defaultValue={"5"}
            onChange={changeRecordCount}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="search-bar-div">
          <input
            className="campaign-search"
            type={"text"}
            onChange={changeSearchText}
          />
          <div className="search-bar-icon">
            <AiIcons.AiOutlineSearch />
          </div>
        </div>
      </div>
      <SenderTable
        senderDetails={senderDetails}
        refreshSenderDetails={refreshSenderDetails}
      />
      <div className="table-bottom-div">
        Page <PageOptions />
      </div>
    </div>
  );
};

const SenderTable = ({ senderDetails, refreshSenderDetails }) => {
  const [campaignDetailCard, setCampaignDetailCard] = useState([]);

  const updateSenderDetail = (number, status) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      number: number,
      status: status,
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/sender",
      {
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(Response);
        refreshSenderDetails();
      })
      .catch();
  };

  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "170px", paddingLeft: "60px" }}
          >
            Number
          </div>
          <div
            className="table-header-data"
            style={{ width: "25%", minWidth: "220px" }}
          >
            Assigned To
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "120px" }}
          >
            Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "25%", minWidth: "250px" }}
          >
            Assigned Date
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "160px" }}
          >
            Action
          </div>
        </div>
        <div className="table-row-container">
          {senderDetails?.map((detail, index) => (
            <div className="table-row" key={detail.id}>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "170px", paddingLeft: "60px" }}
              >
                {detail.number}
              </div>
              <div
                className="table-row-data"
                style={{ width: "25%", minWidth: "220px" }}
              >
                {detail.assignedTo}
              </div>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "120px" }}
              >
                {detail.status}
              </div>
              <div
                className="table-row-data"
                style={{ width: "25%", minWidth: "250px" }}
              >
                {detail.createDate}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "260px" }}
              >
                <div
                  to="#"
                  className="table-row-link"
                  onClick={() =>
                    updateSenderDetail(
                      detail.number,
                      `${detail.status === "ACTIVE" ? `INACTIVE` : `ACTIVE`}`
                    )
                  }
                >
                  {`${detail.status === "ACTIVE" ? `Deactivate` : ``}`}

                  {`${detail.status === "INACTIVE" ? `Activate` : ``}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </table>
    </div>
  );
};
