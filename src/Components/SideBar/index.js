import React from "react";
import "./sidebar.css";
import Button from "@material-ui/core/Button";




function SideBar(props) {

  return (
    <div className="sidebar">
      <div className="filter-head">
        <h5 className="filter-title">Filters</h5>
        <Button variant="outlined" >Clear Filters</Button>
      </div>
      </div>
  );
}

export default SideBar;
