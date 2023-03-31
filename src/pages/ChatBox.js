import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as TbIcons from "react-icons/tb";
import * as BiIcons from "react-icons/bi";
import * as CiIcons from "react-icons/ci";
import Navbar from "../components/NavBar";
import profile from "../assets/profile-pic.png";
import "../assets/css/Chat-box.css";

export const Chatbox = () => {
  const [smallScreenStyle, toggleChatBoxStyle] = useState(
    window.innerWidth > 520
  );

  const [showChatConversation, toggleChatConversation] = useState(false);

  const [showNewConvo, toggleNewConvo] = useState(false);

  const openNewConvo = () => toggleNewConvo(!showNewConvo);

  const detectSize = () => {
    if (window.innerWidth > 520) {
      toggleChatBoxStyle(true);
    }
    if (window.innerWidth <= 520) {
      toggleChatBoxStyle(false);
      toggleChatConversation(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  });

  const [chatContacts, setChatContacts] = useState(null);

  const [chats, setChats] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [sender, setSender] = useState();

  const [endNumber, setEndNumber] = useState();

  const [chatAddAction, setChatAddAction] = useState("replace");

  const fetchChatContacts = () => {
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/chat-contacts?" +
        new URLSearchParams({
          user: "pramoi",
          searchValue: searchValue,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.chatContactList);
        if (data.chatContactList.length > 0) {
          setChatContacts(data.chatContactList);
        } else setChatContacts([{ recipient: "No Details Present" }]);
      })
      .catch(setChatContacts([{ recipient: "Loading ..." }]));
  };

  const fetchChats = (endNumber, sender) => {
    fetch(
      "http://ec2-3-25-169-29.ap-southeast-2.compute.amazonaws.com:8080/tw-sms-1/chat?" +
        new URLSearchParams({
          size: 25,
          pageNumber: pageNumber,
          user: "pramoi",
          sender: sender,
          number: endNumber,
        })
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data.messages);
        if (chats === data.messages) {
        } else if (chatAddAction == "replace") {
          setChats(data.messages);
          console.log(data.messages);
        } else {
          const existingChats = chats;
          existingChats.concat(data.messages);
          console.log(data.messages);
        }
      })
      .catch();
  };

  useEffect(() => {
    fetchChatContacts();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
    fetchChatContacts();
  };

  const setChatConversation = (endNumber, sender) => {
    setEndNumber(endNumber);
    setSender(sender);
    fetchChats(endNumber, sender);

    if (window.innerWidth <= 520) {
      toggleChatConversation(!showChatConversation);
    }
  };

  return (
    <div>
      <Navbar activePage={"chat-box"} />
      <div className="chat-box-main-container">
        <div className="chat-box-sub-container">
          <div className="chat-box-top-container">
            {showNewConvo && <NewConversation openNewConvo={openNewConvo} />}
            {(!showChatConversation || smallScreenStyle) && (
              <div className="chat-search-bar-div">
                <input
                  className="chat-search"
                  type={"text"}
                  onChange={handleSearchInputChange}
                />

                <Link to="#" className="chat-search-bar-icon">
                  <AiIcons.AiOutlineSearch className="chat-search-bar-icon" />
                </Link>
              </div>
            )}
            <div
              className={
                showChatConversation
                  ? "chat-box-top-button-div-second"
                  : "chat-box-top-button-div"
              }
            >
              {(!showChatConversation || smallScreenStyle) && (
                <div
                  className="chat-box-top-button"
                  to="#"
                  onClick={openNewConvo}
                >
                  <TbIcons.TbMessagePlus className="chat-box-top-button-icon" />
                </div>
              )}
              {(showChatConversation || smallScreenStyle) && (
                <div className="chat-box-top-button-div">
                  {!smallScreenStyle && (
                    <div
                      className="chat-box-top-button"
                      to="#"
                      onClick={setChatConversation}
                    >
                      <BiIcons.BiArrowBack className="chat-box-top-button-icon" />
                    </div>
                  )}

                  <div className="chat-box-top-button" to="#">
                    <BiIcons.BiTrashAlt className="chat-box-top-button-icon" />
                  </div>
                  <div className="chat-box-top-button" to="#">
                    <BiIcons.BiBlock className="chat-box-top-button-icon" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="chat-container">
            {(smallScreenStyle || !showChatConversation) && (
              <div className="chat-contacts">
                {chatContacts?.map((data) => (
                  <div
                    className="chat-contact-container"
                    onClick={() =>
                      setChatConversation(data.recipient, data.sender)
                    }
                  >
                    <div className="c-con-left-cont">
                      <div className="chat-contact-details">
                        <div className="contact-name">{data.recipient}</div>
                        <div className="contact-number">{data.sender}</div>
                      </div>
                    </div>
                    <div className="c-con-right-cont">
                      <div className="c-con-right-cont">{data.date}</div>
                      <div className="c-con-right-cont">{data.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(smallScreenStyle || showChatConversation) && (
              <div className="chat-conversation-box">
                <div className="conversation">
                  {chats?.map((chat) => (
                    <div className="conversation-message">{chat.message}</div>
                  ))}
                </div>
                <div className="conversation-down-container">
                  <div className="message-bar-div">
                    <input className="chat-message-input" type={"text"} />
                  </div>
                  <Link className="chat-box-top-button" to="#">
                    <BiIcons.BiSend className="chat-box-top-button-icon" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewConversation = ({ openNewConvo }) => {
  return (
    <div className="new-conversation-background">
      <div className="new-conversation-container">
        <div className="new-convo-title">New Conversation</div>
        <div className="new-convo-form-element">
          <div className="form-element-text">Type</div>
          <div className="type-radio-div">
            <div className="contact-type-text">
              <input
                type={"radio"}
                className="contact-type-nc"
                name="contact-type-nc"
                value="New"
              />
              New
            </div>
            <div className="contact-type-text">
              <input
                type={"radio"}
                className="contact-type-nc"
                name="contact-type-nc"
                value="Existing"
              />
              Existing
            </div>
          </div>
        </div>
        <div className="new-convo-form-element">
          <div className="form-element-text">Contact</div>
          <input
            type={"text"}
            className="form-element-input-nc"
            maxLength={10}
          />
        </div>
        <div className="new-convo-buttons-div">
          <div className="new-convo-button" onClick={openNewConvo}>
            Discard
          </div>
          <div className="new-convo-button" onClick={openNewConvo}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};
