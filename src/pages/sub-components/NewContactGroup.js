import React, { useForm, useState } from "react";
import ReactDOM from "react-dom";
import "../../assets/css/NewContact.css";

const NewContactGroup = ({
  showNewContact: showNewContactGroup,
  toggleShowNewContact: toggleShowNewContactGroup,
  refreshContactDetails: refreshContactGroupDetails,
  user,
}) => {
  const [error, setError] = useState("");

  const addContactDetail = () => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      user: "pramoi",
      name: name,
      contactList: [{ contactNumber: number }],
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact-group/create",
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
        if (response.code === "P005") {
          handleDiscard();
          refreshContactGroupDetails();
        } else setError("!! " + response.message + " !!");
      })
      .catch();
  };

  const [number, setNumber] = useState("");

  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  };

  const [name, setName] = useState("");

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };

  const handleDiscard = () => {
    toggleShowNewContactGroup();
    setNumber("");
    setName("");
    setError("");
  };

  return (
    <div
      className={`new-contact-back-container ${
        showNewContactGroup && "active"
      }`}
    >
      <div
        className={`new-contact-main-container ${
          showNewContactGroup && "active"
        }`}
      >
        <div className="title">Add Contact Group</div>
        <div className="form-element">
          <div className="nc-form-element-text">Name</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleNameInputChange}
            value={name}
          />
        </div>
        <div className="form-element">
          <div className="nc-form-element-text">Number</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleNumberInputChange}
            value={number}
          />
        </div>
        <div className="cc-form-buttons-div">
          <div className="campaign-form-buttons" onClick={handleDiscard}>
            Discard
          </div>
          <div className="campaign-form-buttons" onClick={addContactDetail}>
            Submit
          </div>
        </div>
        <div className="cc-status-message">{error}</div>
      </div>
    </div>
  );
};

export default NewContactGroup;
