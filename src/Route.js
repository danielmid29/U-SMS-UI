import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Contacts } from "./pages/Contacts";
import { Chatbox } from "./pages/ChatBox";
import Sender from "./pages/Sender";
import SenderCart from "./pages/SenderCart";
import ContactGroup from "./pages/ContactsGroup";
import Users from "./pages/Users";
import { MessageReport } from "./pages/MessageReport";
import GroupContacts from "./pages/GroupContacts";
import Dashboard from "./pages/Dashboard";
import { Campaign } from "./pages/Campaign";

const RouteComp = () => {
  return (
    <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/sender" exact component={Sender} />
      <Route path="/sender-cart" exact component={SenderCart} />
      <Route path="/campaign" component={Campaign} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/contact-group" component={ContactGroup} />
      <Route path="/contact/:name" component={GroupContacts} />
      <Route path="/chat-box" component={Chatbox} />
      <Route path="/users" component={Users} />
      <Route path="/message-report" component={MessageReport} />
    </Switch>
  );
};

export default RouteComp;
