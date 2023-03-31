import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import Navbar from "../components/NavBar";
import "../assets/css/Campaign.css";
import CampaignBuilder from "./sub-components/CampaignBuilder";

export const MessageReport = () => {
  return (
    <div className="campaign-main-container">
      <Navbar activePage={"message-report"} />
      <MGTableCard />
    </div>
  );
};

const MGTableCard = () => {
  const [recordCount, setRecordCount] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const setRecordtoBePrint = (event) => {
    setRecordCount(event.target.value);
  };

  const [messageList, setMessageList] = useState(null);

  const fetchMessageList = (user, recordCount, searchValue, pageNumber) => {
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/message?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          user: user,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.messages);
        if (data.messages?.length > 0) {
          setMessageList(data.messages);
          setTotalPage(data.totalPage);
        } else setMessageList([{ status: "No Details Present" }]);
      })
      .catch(setMessageList([{ status: "Loading ..." }]));
  };

  useEffect(() => {
    fetchMessageList(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeRecordCount = (event) => {
    setRecordCount(event.target.value);
    fetchMessageList(user, event.target.value, searchValue, pageNumber);
    setPageNumber(1);
  };

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    fetchMessageList(user, recordCount, event.target.value, pageNumber);
    setPageNumber(1);
  };

  const PageOptions = () => {
    var options = [],
      i = 0,
      len = totalPage;
    while (++i <= len) options.push(i);

    console.log(options);

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
    fetchMessageList(user, recordCount, searchValue, e.target.value);
    setPageNumber(e.target.value);
  };

  return (
    <div className="table-container" style={{ marginTop: "50px" }}>
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
      <CampaignTable campaignDetails={messageList} />
      <div className="table-bottom-div">
        Page <PageOptions />
      </div>
    </div>
  );
};

const CampaignTable = ({ campaignDetails }) => {
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
            style={{ width: "15%", minWidth: "220px", paddingLeft: "60px" }}
          >
            From
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "200px" }}
          >
            To
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "150px" }}
          >
            Campaign
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "120px" }}
          >
            Status
          </div>
          <div
            className="table-header-data"
            style={{ width: "15%", minWidth: "120px" }}
          >
            Type
          </div>
          <div
            className="table-header-data"
            style={{ width: "25%", minWidth: "270px" }}
          >
            Message
          </div>
        </div>

        <CampaignCardComponent
          campaignDetail={campaignDetailCard}
          campaignCardBoolean={openCD}
          closeCampaignDetail={closeCampaignDetail}
        />
        <div className="table-row-container">
          {campaignDetails?.map((detail, index) => (
            <div className="table-row" key={detail.id}>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "220px", paddingLeft: "60px" }}
              >
                <Link
                  to="#"
                  className="table-campaign-name-1"
                  onClick={() => setCampaignDetail(detail)}
                >
                  {detail.from}
                </Link>
              </div>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "200px" }}
              >
                {detail.to}
              </div>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "150px" }}
              >
                {detail.campaign}
              </div>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "120px" }}
              >
                {detail.status}
              </div>
              <div
                className="table-row-data"
                style={{ width: "15%", minWidth: "120px" }}
              >
                {detail.type}
              </div>
              <div
                className="table-row-data"
                style={{ width: "25%", minWidth: "270px" }}
              >
                {detail.message}
              </div>
            </div>
          ))}
        </div>
      </table>
    </div>
  );
};

const CampaignCardComponent = ({
  campaignDetail: messageDetails,
  campaignCardBoolean,
  closeCampaignDetail: closeMessageDetail,
}) => {
  return (
    <div className={`cd-back-comp ${campaignCardBoolean && `active`}`}>
      <div className={`cd-main-comp ${campaignCardBoolean && `active`}`}>
        <div className="cd-top-com">
          <div className="cd-title">Message Details</div>
          <IoIcons.IoCloseSharp
            className="cd-close-1"
            onClick={closeMessageDetail}
          />
        </div>
        <div className="cd-element">
          <div className="cd-head">From</div>
          <div className="cd-data">{messageDetails?.from}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">To</div>
          <div className="cd-data">{messageDetails?.to}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Campaign</div>
          <div className="cd-data">{messageDetails?.campaign}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Type</div>
          <div className="cd-data">{messageDetails?.type}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Status</div>
          <div className="cd-data">{messageDetails?.status}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">Message</div>
          <div className="cd-data">{messageDetails?.message}</div>
        </div>
        <div className="cd-element">
          <div className="cd-head">API Message</div>
          <div className="cd-data">{messageDetails?.plivoMessageResponse}</div>
        </div>
      </div>
    </div>
  );
};
