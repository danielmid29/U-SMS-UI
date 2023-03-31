import React, { useForm, useState } from "react";
import ReactDOM from "react-dom";
import "../../assets/css/NewContact.css";
const NewUser = ({ addUser, showNewUserCard, refreshContactDetails }) => {
  const addUserDetail = () => {
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const body = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      userId: userId,
      role: role,
      contact: contact,
      email: email,
    });
    console.log(body);
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/user/create",
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
        if (response.code === "U005") {
          handleDiscard();
          refreshContactDetails();
        } else setError("!! " + response.message + " !!");
      })
      .catch();
  };

  const handleDiscard = () => {
    showNewUserCard();
    setError("");
    setFirstName("");
    setLastName("");
    setUserId("");
    setRole("");
    setContact("");
    setEmail("");
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleFirstNameInputChange = (e) => setFirstName(e.target.value);
  const handleLastNameInputChange = (e) => setLastName(e.target.value);
  const handleUserIdInputChange = (e) => setUserId(e.target.value);
  const handleRoleInputChange = (e) => setRole(e.target.value);
  const handleContactInputChange = (e) => setContact(e.target.value);
  const handleEmailInputChange = (e) => setEmail(e.target.value);

  return (
    <div className={`cc-campaign-builder-container ${addUser && `active`}`}>
      <div className={`user-builder-card ${addUser && "active"}`}>
        <div className="title">Add User</div>
        <div className="form-element">
          <div className="nc-form-element-text">First Name</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleFirstNameInputChange}
            value={firstName}
          />
        </div>
        <div className="form-element">
          <div className="nc-form-element-text">Last Name</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleLastNameInputChange}
            value={lastName}
          />
        </div>
        <div className="form-element">
          <div className="nc-form-element-text">User ID</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleUserIdInputChange}
            value={userId}
          />
        </div>
        <div className="form-element">
          <div className="nc-form-element-text">Role</div>
          <div className="sender-type">
            <div className="sender-radio-button-div">
              <input
                type={"radio"}
                value="sender-id"
                name="sender-type"
                className="sender-radio-button"
                onChange={handleRoleInputChange}
              />
              Admin
            </div>
            <div className="sender-radio-button-div">
              <input
                type={"radio"}
                value="phone-number"
                name="sender-type"
                className="sender-radio-button"
                onChange={handleRoleInputChange}
              />
              Normal
            </div>
          </div>
        </div>

        <div className="form-element">
          <div className="nc-form-element-text">Number</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleContactInputChange}
            value={contact}
          />
        </div>
        <div className="form-element">
          <div className="nc-form-element-text">Email</div>
          <input
            type={"text"}
            className="text-input"
            onChange={handleEmailInputChange}
            value={email}
          />
        </div>
        <div className="cc-form-buttons-div">
          <div className="form-buttons" onClick={showNewUserCard}>
            Discard
          </div>
          <div className="form-buttons" onClick={addUserDetail}>
            Submit
          </div>
        </div>
        <div className="cc-status-message">{error}</div>
      </div>
    </div>
  );
};

export default NewUser;
