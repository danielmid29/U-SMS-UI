import React, { useForm, useState } from "react";
import ReactDOM from "react-dom";
import "../../assets/css/NewContact.css";

const NewContact = ({
  showNewContact,
  toggleShowNewContact,
  refreshContactDetails,
  user,
  groupName,
}) => {
  const [error, setError] = useState("");

  const addContactDetail = () => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      user: "pramoi",
      contactNumber: number,
      contactGroup: groupName,
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/contact/create",
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
        if (response.code === "P002") {
          handleDiscard();
          refreshContactDetails();
        } else setError("!! " + response.message + " !!");
      })
      .catch();
  };

  const [number, setNumber] = useState("");

  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  };

  const handleDiscard = () => {
    toggleShowNewContact();
    setNumber("");
    setError("");
  };

  return (
    <div className={`new-contact-back-container ${showNewContact && "active"}`}>
      <div
        className={`new-contact-main-container ${showNewContact && "active"}`}
      >
        <div className="title">Add Contact</div>
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

export default NewContact;
