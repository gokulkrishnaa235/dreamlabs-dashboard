import React from "react";
import "./customTable.css";

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

const getKey = {
  created_date: "Created Date",
  type: "Type",
  name: "Name",
  matches: "Matches",
  "match-status": "Match Status",
  "risk-level": "Risk Level",
  "watch-list": "Watch List",
  pep: "PEP",
  assigned: "Assigned",
  status: "Status",
  country: "Country",
};

function CustomTable(props) {
  const {
    tableData,
    matchPercentage,
    countryOrigin,
    watchList,
    riskLevel,
    pepClass,
    fromDate,
    toDate,
    tableHeading,
  } = props;

  const applyWatchListFilter = (filterList) => {
    if (
      watchList.filter((element) => filterList.includes(element)).length > 0 ||
      watchList.length === 0
    ) {
      return true;
    }
    return false;
  };

  const applyCheckPepFilter = (filterList) => {
    if (
      pepClass.filter((element) => filterList.includes(element)).length > 0 ||
      pepClass.length === 0
    ) {
      return true;
    }
    return false;
  };

  const applyCountryFilter = (countryList) => {
    if (countryOrigin.length !== 0) {
      return countryOrigin.includes(countryList);
    }
    return true;
  };

  const applyRiskFilter = (risk) => {
    if (riskLevel.length !== 0) {
      return riskLevel.includes(risk);
    }
    return true;
  };

  const applyDateFilter = (date) => {
    const fromDateString = Date.parse(new Date(fromDate).toUTCString());
    const toDateString = Date.parse(new Date(toDate).toUTCString());
    const dateString = Date.parse(new Date(date).toUTCString());
    if (dateString >= fromDateString && dateString <= toDateString) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            {Title.map((title) =>
              tableHeading.includes(title) ? (
                <th key={title}> {title}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((value) => {
            if (
              value.matches <= matchPercentage &&
              applyRiskFilter(value.riskLevel) &&
              applyCountryFilter(value.country) &&
              applyWatchListFilter(value.watchList) &&
              applyCheckPepFilter(value.pepClass) &&
              applyDateFilter(value.created_date)
            )
              return (
                <tr key={value._id}>
                  {tableHeading.includes(getKey["created_date"]) ? (
                    <td
                      id="created_date"
                      className={value.status ? "" : "disabled"}
                    >
                      {value.created_date}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["type"]) ? (
                    <td id="type" className={value.status ? "" : "disabled"}>
                      {value.type}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["name"]) ? (
                    <td
                      id="name"
                      className={value.status ? "" : "disabled"}
                    >{`${value.name.first} ${value.name.last}`}</td>
                  ) : null}
                  {tableHeading.includes(getKey["matches"]) ? (
                    <td id="matches" className={value.status ? "" : "disabled"}>
                      {value.matches}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["match-status"]) ? (
                    <td
                      id="match-status"
                      className={value.status ? "" : "disabled"}
                    >
                      {value.matchStatus}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["risk-level"]) ? (
                    <td
                      id="risk-level"
                      className={value.status ? "" : "disabled"}
                    >
                      {value.riskLevel}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["watch-list"]) ? (
                    <td
                      id="watch-list"
                      className={value.status ? "" : "disabled"}
                    >
                      {value.watchList}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["pep"]) ? (
                    <td id="pep" className={value.status ? "" : "disabled"}>
                      {[...value.pepClass].toString()}
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["assigned"]) ? (
                    <td
                      id="assigned"
                      className={value.status ? "" : "disabled"}
                    >{`${value.assignTo.first} ${value.assignTo.last}`}</td>
                  ) : null}
                  {tableHeading.includes(getKey["status"]) ? (
                    <td id="status">
                      <label className="switch">
                        <input type="checkbox" checked={value.status} />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  ) : null}
                  {tableHeading.includes(getKey["country"]) ? (
                    <td id="country" className={value.status ? "" : "disabled"}>
                      {value.country}
                    </td>
                  ) : null}
                </tr>
              );
            return null;
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default CustomTable;
