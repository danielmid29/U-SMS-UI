import React, { useForm, useState } from "react";
import ReactDOM from "react-dom";
import profile from "../../assets/profile-pic.png";
import "../../assets/css/SimpleProfile.css";
import * as AiIcons from "react-icons/ai";

const SimpleProfile = ({ openProfile, contentStyle }) => {
  const [option, setOption] = useState(false);

  const showOptions = () => setOption(!option);

  const [showDpOption, setShowDpOption] = useState(false);

  const toggleShowDpOption = () => setShowDpOption(!showDpOption);

  const [templateOptions, setTemplateOptions] = useState(false);

  const showTemplateOptions = () => setTemplateOptions(!templateOptions);
  return (
    <div className={contentStyle}>
      <div className="simple-profile-main-container">
        <div className="sp-top-container">
          <img src={profile} className="sp-user-pic" alt="user-img"></img>
          <AiIcons.AiOutlineEdit
            className="sp-edit-button-dp"
            onClick={toggleShowDpOption}
          />
          {showDpOption && (
            <div class="dummy-div" onClick={toggleShowDpOption} />
          )}
          <div className={`sp-dp-update-options ${showDpOption && "active"}`}>
            <div className="sp-dp-update-options-single">Upload</div>
            <div className="sp-dp-update-options-single">Delete</div>
          </div>
          <div className="sp-user-name">Jerry</div>
          <div className="sp-user-id">~jerry23</div>
        </div>
        <div className="sp-form-element">
          <div className="sp-text-label">Contact</div>
          <input
            type={"text"}
            className="sp-text-input"
            defaultValue={"7532156216"}
            readOnly
          />
          <AiIcons.AiOutlineEdit className="sp-edit-button" />
        </div>
        <div className="sp-form-element">
          <div className="sp-text-label">Role</div>
          <input
            type={"text"}
            className="sp-text-input"
            defaultValue={"Admin"}
            readOnly
          ></input>
        </div>

        <div className="sp-form-element">
          <div className="sp-text-label">Total Contacts</div>
          <input
            type={"text"}
            className="sp-text-input"
            defaultValue={"23"}
            readOnly
          />
        </div>
        <div className="sp-form-element">
          <div className="sp-text-label">Total SMS Sent</div>
          <input
            type={"text"}
            className="sp-text-input"
            defaultValue={"526"}
            readOnly
          />
        </div>

        <div className="sp-form-buttons-div">
          <div className="sp-form-buttons">Reset Password</div>
          <div className="sp-form-buttons" onClick={openProfile}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfile;
