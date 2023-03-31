import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as TbIcons from "react-icons/tb";
import * as FaIcons from "react-icons/fa";
import profile from "../assets/profile-pic.png";
import "../assets/css/NavBar.css";
import SimpleProfile from "../pages/sub-components/Simple-Profile";

const Navbar = ({ activePage, isAdmin }) => {
  const [sidebar, setSidebar] = useState(window.innerWidth > 1110);

  const showSidebar = () => setSidebar(!sidebar);

  const [profileDrop, setProfileDrop] = useState(false);

  const showProfileDrop = () => setProfileDrop(!profileDrop);

  const detectSize = () => {
    if (window.innerWidth > 1110) setSidebar(true);
    if (window.innerWidth <= 1110) setSidebar(false);
    console.log("width" + window.innerWidth);
    console.log("height" + window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  const [showProfile, toggleShowProfile] = useState(false);

  const openProfile = () => {
    setProfileDrop(false);
    toggleShowProfile(!showProfile);
  };

  const ProfileDropDown = styled.div`
    position: absolute;
    right: 10px;
    display: "flex";
    height: 100px;
    width: 120px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-decoration: none;
    color: #dcc29e;
    background-color: #4d4335;
    backdrop-filter: blur(4px);
    transition: 0.3s ease-in-out;
    border-radius: 13px;
    border-width: 2px;
    margin-top: 10px;
  `;

  return (
    <div className="main-container">
      <NavLink to="#" className="option-bars">
        <FaIcons.FaBars onClick={showSidebar} />
      </NavLink>
      <div>Ultimate SMS</div>
      <ul className={sidebar ? "nav-links-active" : "nav-links"}>
        <li>
          <NavLink
            to="/dashboard"
            className={
              activePage === "dashboard" ? "nav-link-active" : "nav-link"
            }
          >
            <TbIcons.TbLayoutGrid className="nav-icon" />
            <div className="nav-bar-text">Dashboard</div>
          </NavLink>
        </li>
        <li>
          <Link
            to="/campaign"
            className={
              activePage === "campaign" ? "nav-link-active" : "nav-link"
            }
          >
            <BiIcons.BiCollection className="nav-icon" />
            <div className="nav-bar-text">Campaign</div>
          </Link>
        </li>
        <li className="nav-link-li">
          <Link
            to="/chat-box"
            className={
              activePage === "chat-box" ? "nav-link-active" : "nav-link"
            }
          >
            <BiIcons.BiChat className="nav-icon" />
            <div className="nav-bar-text">Chat Box</div>
          </Link>
        </li>
        <li>
          <Link
            to="/sender"
            className={activePage === "sender" ? "nav-link-active" : "nav-link"}
          >
            <BiIcons.BiSend className="nav-icon" />
            <div className="nav-bar-text">Sender</div>
          </Link>
        </li>
        <li>
          <Link
            to="/contacts"
            className={
              activePage === "contacts" ? "nav-link-active" : "nav-link"
            }
          >
            <BiIcons.BiBookContent className="nav-icon" />
            <div className="nav-bar-text">Contacts</div>
          </Link>
        </li>
        <li>
          <Link
            to="/message-report"
            className={
              activePage === "message-report" ? "nav-link-active" : "nav-link"
            }
          >
            <BiIcons.BiDetail className="nav-icon" />
            <div className="nav-bar-text">Message Report</div>
          </Link>
        </li>

        <li style={{ display: isAdmin && "none" }}>
          <Link
            to="/users"
            className={activePage === "users" ? "nav-link-active" : "nav-link"}
          >
            <AiIcons.AiOutlineTeam className="nav-icon" />
            <div className="nav-bar-text">Users</div>
          </Link>
        </li>

        <li>
          <Link to="#" className="nav-link-mobile" onClick={showSidebar}>
            <BiIcons.BiWindowClose className="nav-icon" />
            <div className="nav-bar-text">Close</div>
          </Link>
        </li>
      </ul>
      <div className="navbar-right-container">
        <Link to="#" className="notification">
          <BiIcons.BiBell className="notification-icon" />
        </Link>
        <div>
          <SimpleProfile
            openProfile={openProfile}
            contentStyle={`simple-profile-back-container ${
              showProfile && "active"
            }`}
          />
          <Link to="#" className="user-detail" onClick={showProfileDrop}>
            <p className="user-detail-text">Jerry</p>
            <img src={profile} className="user-pic" alt="user-img"></img>
          </Link>
          {profileDrop && (
            <div>
              <div
                className="profile-dropdown-dummy"
                onClick={showProfileDrop}
              />
              <div className="profile-dropdown">
                <div className="profile-dropdown-div">
                  <Link
                    to="#"
                    className="profile-dropdown-link"
                    onClick={openProfile}
                  >
                    My Profile
                  </Link>
                </div>
                <div className="profile-dropdown-div">
                  <Link
                    to="#"
                    className="profile-dropdown-link"
                    onClick={showProfileDrop}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
