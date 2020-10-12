import { createSelector } from "reselect";
import { initialState } from "./reducer";

const dashboardState = (state = initialState) => state;

const selectTableData = createSelector(
  dashboardState,
  (subState) => subState.tableData
);

const selectMatchingPercentage = createSelector(
  dashboardState,
  (subState) => subState.matchingPercentage
);

const selectCountryOrigin = createSelector(
  dashboardState,
  (subState) => subState.countryOrigin
);

const selectWatchList = createSelector(
  dashboardState,
  (subState) => subState.watchList
);

const selectRiskLevel = createSelector(
  dashboardState,
  (subState) => subState.riskLevel
);

const selectPepClass = createSelector(
  dashboardState,
  (subState) => subState.PepClass
);

const selectFromDate = createSelector(
  dashboardState,
  (subState) => subState.fromDate
);

const selectToDate = createSelector(
  dashboardState,
  (subState) => subState.toDate
);

const selectTableHeading = createSelector(
  dashboardState,
  (subState) => subState.tableHeading
);

const selectCheckBoxGroup = createSelector(selectTableData, (subState) => {
  let countryGroup = new Set();
  subState.map((value) => countryGroup.add(value.country));
  return { countryGroup };
});

const applyWatchListFilter = (filterList, watchList) => {
  if (
    watchList.filter((element) => filterList.includes(element)).length > 0 ||
    watchList.length === 0
  ) {
    return true;
  }
  return false;
};

const applyCheckPepFilter = (filterList, pepClass) => {
  if (
    pepClass.filter((element) => filterList.includes(element)).length > 0 ||
    pepClass.length === 0
  ) {
    return true;
  }
  return false;
};

const applyCountryFilter = (countryList, countryOrigin) => {
  if (countryOrigin.length !== 0) {
    return countryOrigin.includes(countryList);
  }
  return true;
};

const applyRiskFilter = (risk, riskLevel) => {
  if (riskLevel.length !== 0) {
    return riskLevel.includes(risk);
  }
  return true;
};

const applyDateFilter = (date, fromDate, toDate) => {
  const fromDateString = Date.parse(new Date(fromDate).toUTCString());
  const toDateString = Date.parse(new Date(toDate).toUTCString());
  const dateString = Date.parse(new Date(date).toUTCString());
  if (dateString >= fromDateString && dateString <= toDateString) {
    return true;
  }
  return false;
};

const filteredData = createSelector(
  selectTableData,
  selectMatchingPercentage,
  selectCountryOrigin,
  selectWatchList,
  selectRiskLevel,
  selectPepClass,
  selectFromDate,
  selectToDate,

  (
    selectTableData,
    selectMatchingPercentage,
    selectCountryOrigin,
    selectWatchList,
    selectRiskLevel,
    selectPepClass,
    selectFromDate,
    selectToDate
  ) => {
    return selectTableData.filter((value) => {
      if (
        value.matches <= selectMatchingPercentage &&
        applyRiskFilter(value.riskLevel, selectRiskLevel) &&
        applyCountryFilter(value.country, selectCountryOrigin) &&
        applyWatchListFilter(value.watchList, selectWatchList) &&
        applyCheckPepFilter(value.pepClass, selectPepClass) &&
        applyDateFilter(value.created_date, selectFromDate, selectToDate)
      ) 
        return value;
    });
  }
);

const totalMatch = createSelector(filteredData, (subState) => {
  const matchCount = subState.filter((item) => item.matchStatus === "Match");
  return matchCount.length;
});

const highRiskCount = createSelector(filteredData, (subState) => {
  const riskCount = subState.filter((item) => item.riskLevel === "High");
  return riskCount.length;
});

const WarningCount = createSelector(filteredData, (subState) => {
  const warningCount = subState.filter((item) => item.watchList.includes("W"));
  return warningCount.length;
});

const dataCount = createSelector(filteredData, (subState) => subState.length);

export {
  selectTableData,
  selectCheckBoxGroup,
  selectMatchingPercentage,
  selectCountryOrigin,
  selectWatchList,
  selectRiskLevel,
  selectPepClass,
  selectFromDate,
  selectToDate,
  selectTableHeading,
  dataCount,
  totalMatch,
  highRiskCount,
  WarningCount,
  filteredData,
};
