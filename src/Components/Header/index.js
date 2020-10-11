import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";

import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-title">
        <h6 className="title">Monitor Center</h6>
        <h6 className="title">Assessment Center</h6>
        <h6 className="title">Admin</h6>
      </div>
      <div className="account-icon-wrapper">
        <AccountCircle />
      </div>
    </header>
  );
}

export default Header;
