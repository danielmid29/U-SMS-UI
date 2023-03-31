import React, { useState, useEffect } from "react";
import "../../assets/css/CampaignBuilder.css";
const CampaignBuilder = ({ addCampaign, showCampaignBuilder }) => {
  const [recordCount, setRecordCount] = useState(100);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUse] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [showSenderOptions, setShowSenderOptions] = useState(false);

  const showSender = () => {
    setSenderNumber(senderNumber);
    setShowSenderOptions(!showSenderOptions);
    fetchCBSenderOptions(user, recordCount, senderNumber, pageNumber);
  };

  const [shwCntctGrpOptn, setShwCntctGrpOptn] = useState(false);

  const toggleContactGroup = () => {
    setContactGroup(contactGroup);
    setShwCntctGrpOptn(!shwCntctGrpOptn);
    fetchCGOptions(user, recordCount, contactGroup, pageNumber);
  };

  // const [templateOptions, setTemplateOptions] = useState(false);

  // const showTemplateOptions = () => setTemplateOptions(!templateOptions);

  const fetchCBSenderOptions = (
    assignedTo,
    recordCount,
    searchValue,
    pageNumber
  ) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/sender?" +
        new URLSearchParams({
          searchValue: searchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          assignedTo: assignedTo,
          assignedTo: "pramoi23",
          status: "ACTIVE",
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.senderList);
        const senderList = data.senderList;
        if (senderList?.length > 0) setSenderOptions(senderList);
        else setSenderOptions([{ number: "No Details Found" }]);
      })
      .catch(setSenderOptions([{ number: "Loading ..." }]));
  };

  const fetchCGOptions = (user, recordCount, cgSearchValue, pageNumber) => {
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact-group?" +
        new URLSearchParams({
          searchValue: cgSearchValue,
          size: recordCount,
          pageNumber: pageNumber - 1,
          user: "pramoi",
          status: "ACTIVE",
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.contactGroupList);
        const contactGroupList = data.contactGroupList;
        if (contactGroupList?.length > 0) setCGOptions(contactGroupList);
        else setCGOptions([{ name: "No Details Found" }]);
      })
      .catch(setCGOptions([{ name: "Loading ..." }]));
  };

  const [CGOptions, setCGOptions] = useState([]);
  const [senderOptions, setSenderOptions] = useState([]);

  const [senderNumber, changeSenderNumber] = useState("");

  const [name, setName] = useState("");
  const [contactGroup, setContactGroup] = useState("");
  const [message, setMessage] = useState("");

  const handleNameTextChange = (e) => setName(e.target.value);
  const handleCGChange = (e) => {
    setContactGroup(e.target.value);
    fetchCGOptions(user, recordCount, e.target.value, pageNumber);
  };
  const handleMessageChange = (e) => setMessage(e.target.value);

  const setSenderNumber = (sender) => {
    if (sender === "No Details Found" || sender === "Loading ...") {
    } else {
      changeSenderNumber(sender);
      setShowSenderOptions(false);
    }
  };

  const changeSenderOptions = (data) => setSenderOptions(data);

  const setSOOnTextChange = (e) => {
    setSearchValue(e.target.value);
    fetchCBSenderOptions(user, recordCount, e.target.value, pageNumber);
  };

  const handleClictCGOption = (data) => {
    if (data === "No Details Found" || data === "Loading ...") {
    } else {
      setContactGroup(data);
      setShwCntctGrpOptn(!shwCntctGrpOptn);
    }
  };

  useEffect(() => {
    fetchCBSenderOptions(user, recordCount, searchValue, pageNumber);
    fetchCGOptions(user, recordCount, searchValue, pageNumber);
  }, []);

  const changeSearchText = (event) => {
    setSearchValue(event.target.value);
    changeSenderNumber(event.target.value);
    fetchCBSenderOptions(user, recordCount, event.target.value, pageNumber);
  };

  const sendCampaign = () => {
    if (name === "" || message === "")
      setErrorMessage("!! Please fill in the mandatory fields !!");
    else
      sendCampaignRequest("pramoi", name, senderNumber, contactGroup, message);
  };
  const sendCampaignRequest = (user, name, sender, contactgGroup, message) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      user: user,
      name: name,
      sender: sender,
      contactGroup: [contactgGroup],
      message: message,
    });
    console.log(body);
    const response = fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/campaign/send",
      {
        method: "POST",
        body: JSON.stringify({
          user: user,
          name: name,
          sender: sender,
          contactGroups: [contactgGroup],
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response?.code === "CF001")
          setErrorMessage("!! " + response.message + " !!");
        else if (response?.code === "C002") {
          handleDiscard();
        } else {
          setErrorMessage("!! " + response.message + " !!");
        }
      })
      .catch();
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleDiscard = () => {
    showCampaignBuilder();
    setErrorMessage("");
    setMessage("");
    setName("");
    setSenderNumber("");
    setContactGroup("");
    setSearchValue("");
    changeSenderNumber("");
  };

  return (
    <div className={`cc-campaign-builder-container ${addCampaign && `active`}`}>
      <div className={`cc-campaign-builder-card ${addCampaign && `active`}`}>
        <div className="campaign-title"> Campaign Builder</div>
        <div className="campaign-form-element">
          <div className="campaign-form-element-text">
            Name<div>*</div>
          </div>
          <div className="campaign-text-input-div">
            <input
              type={"text"}
              onChange={handleNameTextChange}
              className="campaign-text-input"
              value={name}
            />
          </div>
        </div>
        <div className="campaign-form-element">
          <div className="campaign-form-element-text">
            Sender<div>*</div>
          </div>
          <div className="campaign-text-input-div">
            <input
              type={"text"}
              className="campaign-text-input"
              onFocus={showSender}
              onChange={changeSearchText}
              value={senderNumber}
            />
            {showSenderOptions && (
              <div>
                <div className="campaign-dummy-div" onClick={showSender} />
                <div className="campaign-sender-options-div">
                  {senderOptions.map((data, index) => (
                    <div
                      className="campaign-sender-options"
                      onClick={() => setSenderNumber(data.number)}
                      key={data.id}
                    >
                      {data.number}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="campaign-form-element">
          <div className="campaign-form-element-text">
            Contact Group<div>*</div>
          </div>
          <div className="campaign-text-input-div">
            <input
              type={"text"}
              className="campaign-text-input"
              onFocus={toggleContactGroup}
              value={contactGroup}
              onChange={handleCGChange}
            />
            {shwCntctGrpOptn && (
              <div>
                <div
                  className="campaign-dummy-div"
                  onClick={toggleContactGroup}
                />
                <div className="campaign-sender-options-div">
                  {CGOptions.map((data, index) => (
                    <div
                      className="campaign-sender-options"
                      onClick={() => handleClictCGOption(data.name)}
                      key={data.id}
                    >
                      {data.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="campaign-form-element">
          <div className="campaign-form-element-text">Template</div>
          <div className="campaign-text-input-div">
            <input
              type={"text"}
              className="campaign-text-input"
              onFocus={showTemplateOptions}
            />
            {templateOptions && (
              <div>
                <div
                  className="campaign-dummy-div"
                  onClick={showTemplateOptions}
                />
                <div className="campaign-sender-options-div">
                  <div
                    className="campaign-sender-options"
                    onClick={showTemplateOptions}
                  >
                    Tegra
                  </div>
                  <div
                    className="campaign-sender-options"
                    onClick={showTemplateOptions}
                  >
                    Defqon
                  </div>
                  <div
                    className="campaign-sender-options"
                    onClick={showTemplateOptions}
                  >
                    Q-Dance
                  </div>
                </div>
              </div>
            )}
          </div>
        </div> */}

        <div className="campaign-form-element">
          <div>
            <div className="campaign-form-element-text">
              Message<div>*</div>
            </div>
            <div className="campaign-form-element-message">
              (Maximum Characters 160)
            </div>
          </div>
          <textarea
            className="campaign-message-text-input"
            maxLength={160}
            onChange={handleMessageChange}
            value={message}
          />
        </div>
        <div className="campaign-form-buttons-div">
          <div className="campaign-form-buttons" onClick={handleDiscard}>
            Discard
          </div>
          <div className="campaign-form-buttons" onClick={sendCampaign}>
            Send
          </div>
        </div>
        <div className="cc-status-message">{errorMessage}</div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
