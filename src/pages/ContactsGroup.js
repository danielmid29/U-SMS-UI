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
import NewContact from "./sub-components/NewContact";
import NewContactGroup from "./sub-components/NewContactGroup";

export const ContactGroup = () => {
  const [showNewContactGroup, setShowNewContactGroup] = useState(false);

  const toggleShowNewContactGroup = () =>
    setShowNewContactGroup(!showNewContactGroup);

  return (
    <div className="campaign-main-container">
      <Navbar activePage={"contacts"} />
      <Buttons toggleShowNewContactGroup={toggleShowNewContactGroup} />
      <ContactGroupTableCard
        toggleShowNewContactGroup={toggleShowNewContactGroup}
        showNewContactGroup={showNewContactGroup}
      />
    </div>
  );
};

const Buttons = ({ toggleShowNewContactGroup }) => {
  return (
    <div className="button-container">
      <div
        to="/sender-cart"
        className="button"
        onClick={toggleShowNewContactGroup}
      >
        <div>Add Group</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
      </div>
      <Link to="/contacts" className="button">
        <div>Contacts</div>
        <BiIcons.BiArrowFromRight className="top-button-icon" />
      </Link>
    </div>
  );
};

export default ContactGroup;

const ContactGroupTableCard = ({
  toggleShowNewContactGroup,
  showNewContactGroup,
}) => {
  const [recordCount, setRecordCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [contactGroupDetails, setContactGroupDetails] = useState(null);

  const fetchContactGroupDetails = (
    user,
    recordCount,
    searchValue,
    pageNumber
  ) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact-group?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          user: user,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        if (data.contactGroupList?.length > 0) {
          setContactGroupDetails(data.contactGroupList);
          setTotalPage(data.totalPage);
        } else setContactGroupDetails([{ status: "No Details Present" }]);
      })
      .catch(setContactGroupDetails([{ status: "Loading ..." }]));
  };

  useEffect(() => {
    fetchContactGroupDetails(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeRecordCount = (event) => {
    setRecordCount(event.target.value);
    setPageNumber(1);
    fetchContactGroupDetails(user, event.target.value, searchValue, 1);
  };

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    fetchContactGroupDetails(user, recordCount, event.target.value, pageNumber);
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
    fetchContactGroupDetails(user, recordCount, searchValue, e.target.value);
    setPageNumber(e.target.value);
  };

  const refreshContactGroupDetails = () =>
    fetchContactGroupDetails(user, recordCount, searchValue, pageNumber);

  return (
    <div className="table-container">
      <NewContactGroup
        toggleShowNewContact={toggleShowNewContactGroup}
        showNewContact={showNewContactGroup}
        refreshContactDetails={refreshContactGroupDetails}
      />
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
      <ContactGroupTable
        contactDetails={contactGroupDetails}
        refreshContactDetails={refreshContactGroupDetails}
      />
      <div className="table-bottom-div">
        Page <PageOptions />
      </div>
    </div>
  );
};

const ContactGroupTable = ({ contactDetails, refreshContactDetails }) => {
  const updateContactGroupDetail = (user, name, status) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      user: user,
      name: name,
      status: status,
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact-group",
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
        console.log(response);
        refreshContactDetails();
      })
      .catch();
  };

  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "170px", paddingLeft: "60px" }}
          >
            Name
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "220px" }}
          >
            Contacts
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "120px" }}
          >
            Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "250px" }}
          >
            User
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "180px" }}
          >
            Action
          </div>
        </div>
        <div className="table-row-container">
          {contactDetails?.map((detail, index) => (
            <div className="table-row" key={detail.id}>
              <div
                className="table-row-data"
                style={{
                  width: "20%",
                  minWidth: "170px",
                  paddingLeft: "60px",
                  fontWeight: "500",
                }}
              >
                <Link
                  to={`/contact/` + detail.name}
                  className="table-campaign-name-1"
                >
                  {detail.name}
                </Link>
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "220px" }}
              >
                {detail.contactsCount}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "120px" }}
              >
                {detail.status}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "250px" }}
              >
                {detail.user}
              </div>
              <div
                className="table-row-data"
                style={{ width: "20%", minWidth: "260px" }}
              >
                <div
                  to="#"
                  className="table-row-link"
                  onClick={() =>
                    updateContactGroupDetail(
                      detail.user,
                      detail.name,
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
