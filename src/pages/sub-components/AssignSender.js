import React, { useState, useEffect } from "react";
import "../../assets/css/CampaignBuilder.css";

const AssignSender = ({
  openAS,
  toggleOpenAs,
  type,
  sender,
  refreshSenderDetails,
}) => {
  const [recordCount, setRecordCount] = useState(100);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [shwAssigneeOpt, setShwassigneeOption] = useState(false);

  const toggleAssignee = () => {
    setAssignee(user);
    setShwassigneeOption(!shwAssigneeOpt);
  };

  const fetchAssigneeOptions = (
    user,
    recordCount,
    cgSearchValue,
    pageNumber
  ) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/user/lookup?" +
        new URLSearchParams({
          searchValue: cgSearchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          status: "ACTIVE",
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.contactGroupList);
        const userDetails = data.userDetails;
        if (userDetails?.length > 0) setAssigneeOption(userDetails);
        else setAssigneeOption([{ name: "No Details Found" }]);
      })
      .catch(setAssigneeOption([{ name: "Loading ..." }]));
  };

  const [assigneeOption, setAssigneeOption] = useState([]);

  const [assignee, setAssignee] = useState("");

  const handleCGChange = (e) => {
    setAssignee(e.target.value);
    fetchAssigneeOptions(user, recordCount, e.target.value, pageNumber);
  };

  const handleClictAssigneeOption = (data) => {
    setAssignee(data);
    setShwassigneeOption(!shwAssigneeOpt);
  };

  useEffect(() => {
    fetchAssigneeOptions(user, recordCount, searchValue, pageNumber);
  }, []);

  const handleBuySender = () => {
    buySender();
  };

  const [errorMessage, setErrorMessage] = useState("");

  const buySender = () => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      number: sender,
      type: type,
      assignedTo: assignee,
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
        handleDiscard();
      })
      .catch();
  };

  const handleDiscard = () => {
    toggleOpenAs();
    setErrorMessage("");
    setAssignee("");
  };

  return (
    <div className={`assigner-back-container ${openAS && `active`}`}>
      <div className={`assigner-main-card ${openAS && `active`}`}>
        <div className="campaign-title"> Assign Sender</div>
        <div className="campaign-form-element">
          <div className="campaign-form-element-text">
            Contact Group<div>*</div>
          </div>
          <div className="campaign-text-input-div">
            <input
              type={"text"}
              className="campaign-text-input"
              id="as-input"
              onFocus={toggleAssignee}
              value={assignee}
              onChange={handleCGChange}
            />
            {shwAssigneeOpt && (
              <div>
                <div className="campaign-dummy-div" onClick={toggleAssignee} />
                <div className="campaign-sender-options-div" id="as-option-div">
                  {assigneeOption.map((data, index) => (
                    <div
                      className="campaign-sender-options"
                      onClick={() => handleClictAssigneeOption(data.userId)}
                      key={data.id}
                    >
                      {data.userId}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="campaign-form-buttons-div" id="as-button-div">
          <div className="campaign-form-buttons" onClick={handleDiscard}>
            Discard
          </div>
          <div className="campaign-form-buttons" onClick={handleBuySender}>
            Send
          </div>
        </div>
        <div className="cc-status-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default AssignSender;
