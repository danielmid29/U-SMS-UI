import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import Navbar from "../components/NavBar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../assets/css/Campaign.css";
import CampaignBuilder from "./sub-components/CampaignBuilder";
import NewContact from "./sub-components/NewContact";

export const Contacts = () => {
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"contacts"} />
      <Buttons />
      <ContactTableCard />
    </div>
  );
};

const Buttons = () => {
  const [actionsDrop, setActionsDrop] = useState(false);

  const showAction = () => setActionsDrop(!actionsDrop);

  const [addCampaign, setAddCampaign] = useState(false);

  const showNewContact = () => setAddCampaign(!addCampaign);
  return (
    <div className="button-container">
      {addCampaign && <NewContact showNewContact={showNewContact} />}
      {actionsDrop && (
        <div className="dummy-div-actions" onClick={showAction}></div>
      )}
      <div className="button" onClick={showAction}>
        <div>Action</div>
        <BiIcons.BiChevronDownCircle className="top-button-icon" />
        {actionsDrop && (
          <div className="action-drop-down">
            <div className="action-drop-down-options">Delete</div>
            <div className="action-drop-down-options">Disable</div>
            <div className="action-drop-down-options">Enable</div>
          </div>
        )}
      </div>
      <div className="button" onClick={showNewContact}>
        <div>Add New</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
      </div>
      <div className="button">
        <div>Export</div>
        <AiIcons.AiOutlineFileText className="top-button-icon" />
      </div>
    </div>
  );
};

export default Buttons;

const ContactTableCard = () => {
  return (
    <div className="table-container">
      <div className="contacts-table-top-div">
        <div className="dropdown-container">
          <select className="count-drop-down">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <select className="type-drop-down">
            <option value="10">Contact Group</option>
            <option value="20">Contact Numbers</option>
          </select>
        </div>
        <div className="search-bar-div">
          <input className="contact-search" type={"text"} />
          <Link className="search-bar-icon" to="#">
            <AiIcons.AiOutlineSearch />
          </Link>
        </div>
      </div>
      <ContactsTable />
      <div
        className="table-top-div"
        style={{ paddingTop: "50px", paddingLeft: "20px", color: "#777389" }}
      >
        {" "}
        Showing 1 to 2 of 2 entries
      </div>
    </div>
  );
};

const ContactsTable = () => {
  const [toggleSwitch, setToggleState] = useState(false);

  const setSwitchStatus = () => {
    setToggleState(!toggleSwitch);
  };

  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "5%", minWidth: "50px" }}
          >
            <input type="checkbox" className="check-box" />
          </div>
          <div
            className="table-header-data"
            style={{ width: "35%", minWidth: "230px" }}
          >
            Name
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "150px" }}
          >
            Contacts
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "140px" }}
          >
            Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "20%", minWidth: "200px" }}
          >
            Actions
          </div>
        </div>

        <div className="table-row">
          <div
            className="table-row-data"
            style={{ width: "5%", minWidth: "50px" }}
          >
            <input type="checkbox" className="check-box" />
          </div>
          <div
            className="table-row-data"
            style={{ width: "35%", minWidth: "230px" }}
          >
            <div>
              <Link className="table-campaign-name">Enterprize</Link>
            </div>
          </div>
          <div
            className="table-row-data"
            style={{ width: "20%", minWidth: "150px" }}
          >
            <div>
              <div>Raja</div>
            </div>
          </div>

          <div
            className="table-row-data"
            style={{ width: "20%", minWidth: "140px" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={toggleSwitch}
                  onChange={setSwitchStatus}
                  color="primary"
                  name="status"
                />
              }
            />
          </div>
          <div
            className="table-row-data"
            style={{ width: "20%", minWidth: "200px" }}
          >
            <div className="data-row-button-comp">
              <Link>
                <AiIcons.AiOutlineDelete
                  className="data-row-button"
                  color="#DD5D55"
                />
              </Link>
              <Link>
                <AiIcons.AiOutlineShareAlt
                  className="data-row-button"
                  color="#57C171"
                />
              </Link>
              <Link>
                <AiIcons.AiOutlineEdit
                  className="data-row-button"
                  color="#6C6BED"
                />
              </Link>
            </div>
          </div>
        </div>
      </table>
    </div>
  );
};
