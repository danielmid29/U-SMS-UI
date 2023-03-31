import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import Navbar from "../components/NavBar";
import "../assets/css/Campaign.css";
import CampaignBuilder from "./sub-components/CampaignBuilder";
import profile from "../assets/profile-pic.png";
import NewUser from "./sub-components/NewUser";

export const Users = () => {
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"users"} />
      <Buttons />
      <CampaignTableCard />
    </div>
  );
};

const Buttons = () => {
  const [addUser, setAddUser] = useState(false);

  const showNewUserCard = () => setAddUser(!addUser);
  return (
    <div className="button-container">
      <NewUser addUser={addUser} showNewUserCard={showNewUserCard} />
      <div className="button" onClick={showNewUserCard}>
        <div>Add User</div>
        <BiIcons.BiPlusCircle className="top-button-icon" />
      </div>
    </div>
  );
};

export default Users;

const CampaignTableCard = () => {
  const [recordCount, setRecordCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = () => {
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/user/lookup?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.userDetails);
        if (data.userDetails?.length > 0) {
          setUserDetails(data.userDetails);
          setTotalPage(data.totalPage);
        } else setUserDetails("No Details Found");
      })
      .catch(setUserDetails("Loading ..."));
  };

  useEffect(() => {
    fetchUserDetails(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeRecordCount = (event) => {
    setRecordCount(event.target.value);
    fetchUserDetails(user, event.target.value, searchValue, pageNumber);
  };

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    fetchUserDetails(user, recordCount, event.target.value, pageNumber);
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
    fetchUserDetails(user, recordCount, searchValue, e.target.value);
    setPageNumber(e.target.value);
  };

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
      <UserTable campaignDetails={userDetails} />
      <div className="table-bottom-div">
        Page <PageOptions />
      </div>
    </div>
  );
};

const UserTable = ({ campaignDetails: userDetails }) => {
  const [campaignDetailCard, setCampaignDetailCard] = useState([]);

  const setCampaignDetail = (data) => {
    setCampaignDetailCard(data);
    setOpenCD(true);
  };
  const closeCampaignDetail = () => {
    setOpenCD(false);
  };

  const [openCD, setOpenCD] = useState(false);

  return (
    <div>
      <table className="table">
        <div className="table-header">
          <div
            className="table-header-data"
            style={{ width: "22%", minWidth: "240px", paddingLeft: "40px" }}
          >
            Name
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "150px" }}
          >
            Role
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "150px" }}
          >
            Contacts
          </div>
          <div
            className="table-header-data"
            style={{ width: "18%", minWidth: "250px" }}
          >
            Email
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "150px" }}
          >
            Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "170px" }}
          >
            Action
          </div>
        </div>

        <CampaignCardComponent
          campaignDetail={campaignDetailCard}
          campaignCardBoolean={openCD}
          closeCampaignDetail={closeCampaignDetail}
        />
        <div className="table-row-container">
          {userDetails === "No Details Found" ? (
            <div className="table-row-empty-div">{userDetails}</div>
          ) : userDetails === "Loading ..." ? (
            <div className="table-row-empty-div">{userDetails}</div>
          ) : (
            userDetails?.map((detail, index) => (
              <div className="table-row" key={detail.id}>
                <div
                  className="table-row-data"
                  style={{
                    width: "22%",
                    minWidth: "240px",
                    paddingLeft: "40px",
                  }}
                >
                  <div>
                    <Link to="#" className="up-table-campaign-name">
                      <img
                        src={profile}
                        className="up-user-pic"
                        alt="user-img"
                      ></img>
                      <div>
                        <div className="up-user-name">
                          {detail.firstName + ", " + detail.lastName}
                        </div>
                        <div className="up-user-id">{"~ " + detail.userId}</div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "15%", minWidth: "150px" }}
                >
                  {detail.role}
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "15%", minWidth: "150px" }}
                >
                  {detail.contact}
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "18%", minWidth: "250px" }}
                >
                  {detail.email}
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "15%", minWidth: "150px" }}
                >
                  {detail.status}
                </div>
                <div
                  className="table-row-data"
                  style={{ width: "15%", minWidth: "150px" }}
                >
                  {detail.processed_dateString}
                </div>
              </div>
            ))
          )}
        </div>
      </table>
    </div>
  );
};

const CampaignCardComponent = ({
  campaignDetail,
  campaignCardBoolean,
  closeCampaignDetail,
}) => {
  return (
    <div className={`cd-back-comp ${campaignCardBoolean && `active`}`}>
      <div className={`cd-main-comp ${campaignCardBoolean && `active`}`}>
        <div className="cd-top-com">
          <div className="cd-title">Campaign Detail</div>
          <IoIcons.IoCloseSharp
            className="cd-close-1"
            onClick={closeCampaignDetail}
          />
        </div>
        <div className="cd-element">
          <div className="cd-head">Name</div>
          <div className="cd-data">{campaignDetail?.name}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Sender</div>
          <div className="cd-data">{campaignDetail?.sender}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Status</div>
          <div className="cd-data">{campaignDetail?.status}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Contacts</div>
          <div className="cd-data">{campaignDetail?.contacts}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Processed Date</div>
          <div className="cd-data">{campaignDetail?.processed_dateString}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Contact Group</div>
          <div className="cd-data">
            {campaignDetail?.contactGroups?.join(", ")}
          </div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Message</div>
          <div className="cd-data">{campaignDetail?.message}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">API Message</div>
          <div className="cd-data">{campaignDetail?.plivoMessageResponse}</div>
        </div>
      </div>
    </div>
  );
};
