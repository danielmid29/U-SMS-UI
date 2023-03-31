import React, { useState, useEffect, Component } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import Navbar from "../components/NavBar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../assets/css/Campaign.css";
import CampaignBuilder from "./sub-components/CampaignBuilder";
import NewContact from "./sub-components/NewContact";

export const GroupContacts = () => {
  const [showNewContact, setShowNewContact] = useState(false);

  const toggleShowNewContact = () => setShowNewContact(!showNewContact);
  let { name } = useParams();
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"contacts"} />
      <Buttons toggleShowNewContact={toggleShowNewContact} name={name} />
      <ContactTableCard
        toggleShowNewContact={toggleShowNewContact}
        showNewContact={showNewContact}
        name={name}
      />
    </div>
  );
};

const Buttons = ({ toggleShowNewContact, name }) => {
  return (
    <div className="button-container">
      <Link to="/contact-group" className="button">
        <div>Go Back</div>
        <BiIcons.BiArrowBack className="top-button-icon" />
      </Link>
      <div to="/sender-cart" className="button" onClick={toggleShowNewContact}>
        <div>Add Contact</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
      </div>
      <div className="group-name">
        Contacts {`>`} Contact Group {`>`} {name}
      </div>
    </div>
  );
};

export default GroupContacts;

const ContactTableCard = ({ toggleShowNewContact, showNewContact, name }) => {
  const [recordCount, setRecordCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [contactDetails, setContactDetails] = useState(null);

  const fetchContactDetails = (user, recordCount, searchValue, pageNumber) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          user: user,
          groupName: name,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        if (data.contactList?.length > 0) {
          setContactDetails(data.contactList);
          setTotalPage(data.totalPage);
        } else setContactDetails("No Details Found");
      })
      .catch(setContactDetails("Loading ..."));
  };

  useEffect(() => {
    fetchContactDetails(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeRecordCount = (event) => {
    setRecordCount(event.target.value);
    setPageNumber(1);
    fetchContactDetails(user, event.target.value, searchValue, 1);
  };

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    fetchContactDetails(user, recordCount, event.target.value, pageNumber);
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
    fetchContactDetails(user, recordCount, searchValue, e.target.value);
    setPageNumber(e.target.value);
  };

  const refreshContactDetails = () =>
    fetchContactDetails(user, recordCount, searchValue, pageNumber);

  return (
    <div className="table-container">
      <NewContact
        toggleShowNewContact={toggleShowNewContact}
        showNewContact={showNewContact}
        refreshContactDetails={refreshContactDetails}
        groupName={name}
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
      <ContactTable
        contactDetails={contactDetails}
        refreshContactDetails={refreshContactDetails}
      />
      <div className="table-bottom-div">
        Page <PageOptions />
      </div>
    </div>
  );
};

const ContactTable = ({ contactDetails, refreshContactDetails }) => {
  const updateContactDetail = (user, contactNumber, contactGroup, status) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      user: user,
      contactNumber: contactNumber,
      contactGroup: contactGroup,
      status: status,
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact",
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
            Number
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "220px" }}
          >
            Contact Group
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
            style={{ width: "20%", minWidth: "160px" }}
          >
            Action
          </div>
        </div>
        <div className="table-row-container">
          {contactDetails === "No Details Found" ? (
            <div className="table-row-empty-div">{contactDetails}</div>
          ) : contactDetails === "Loading ..." ? (
            <div className="table-row-empty-div">{contactDetails}</div>
          ) : (
            contactDetails?.map((detail, index) => (
              <div className="table-row" key={detail.id}>
                <div
                  className="table-row-data"
                  style={{
                    width: "20%",
                    minWidth: "170px",
                    paddingLeft: "60px",
                  }}
                >
                  {detail.contactNumber}
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "20%", minWidth: "220px" }}
                >
                  {detail.contactGroup}
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
                      updateContactDetail(
                        detail.user,
                        detail.contactNumber,
                        detail.contactGroup,
                        `${detail.status === "ACTIVE" ? `INACTIVE` : `ACTIVE`}`
                      )
                    }
                  >
                    {`${detail.status === "ACTIVE" ? `Deactivate` : ``}`}

                    {`${detail.status === "INACTIVE" ? `Activate` : ``}`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </table>
    </div>
  );
};
