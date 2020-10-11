import React, { useState, useEffect } from "react";
import "./dashboard.css";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import CustomTable from "../CustomTable";
import Cards from "../Cards";
import { updateTableHeading } from "../../Store/action";
const Title = [
  "Created Date",
  "Type",
  "Name",
  "Matches",
  "Match Status",
  "Risk Level",
  "Watch List",
  "PEP",
  "Assigned",
  "Status",
  "Country",
];

function Dashboard(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const {
    tableData,
    matchPercentage,
    countryOrigin,
    watchList,
    riskLevel,
    pepClass,
    fromDate,
    toDate,
    dispatch,
    tableHeading,
    totalCount,
    matchCount,
    riskCount,
    warningCount,
  } = props;

  const [tableHeadings, updateHeading] = useState([]);

  useEffect(() => {
    updateHeading(tableHeading);
  }, [tableHeading]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const ChangeHeadingHandler = (event) => {
    let heading = tableHeadings;
    if (heading.length > 0 && heading.indexOf(event.target.value) > -1) {
      heading.splice(heading.indexOf(event.target.value), 1);

      updateHeading(heading);
      dispatch(updateTableHeading(heading));
    } else {
      heading.push(event.target.value);
      updateHeading(heading);
      dispatch(updateTableHeading(heading));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="card-group">
        <Cards count={totalCount} label="Monitors" />
        <Cards count={matchCount} label="Matches" />
        <Cards count={riskCount} label="High Risk Level" />
        <Cards count={warningCount} label="Warning Watch List" />
        <Cards count="2" label="assignments" />
      </div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        className="setting-icon"
        onClick={handleToggle}
      >
        <SettingsIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className="menu-item"
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              {Title.map((title) => (
                <MenuItem key={title}>
                  <label className="custom-checkbox">
                    {title}
                    <input
                      type="checkbox"
                      name="table-heading"
                      value={title}
                      onChange={ChangeHeadingHandler}
                      checked={tableHeadings.includes(title)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  {/* <input type="checkbox" name="favorite_pet" value={title} />
                  <label for={title}>{title}</label> */}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
      <CustomTable
        tableData={tableData}
        matchPercentage={matchPercentage}
        countryOrigin={countryOrigin}
        watchList={watchList}
        riskLevel={riskLevel}
        pepClass={pepClass}
        fromDate={fromDate}
        toDate={toDate}
        tableHeading={tableHeading}
      />
    </div>
  );
}

export default Dashboard;
