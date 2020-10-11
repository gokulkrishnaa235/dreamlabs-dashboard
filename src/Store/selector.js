import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectTableData = (state = initialState) => state.tableData;

const dataCount = (state = initialState) => state.tableData.length;

const selectMatchingPercentage = (state = initialState) =>
  state.matchingPercentage;

const selectCountryOrigin = (state = initialState) => state.countryOrigin;

const selectWatchList = (state = initialState) => state.watchList;

const selectRiskLevel = (state = initialState) => state.riskLevel;

const selectPepClass = (state = initialState) => state.PepClass;

const selectFromDate = (state = initialState) => state.fromDate;

const selectToDate = (state = initialState) => state.toDate;

const selectTableHeading = (state = initialState) => state.tableHeading;

const selectCheckBoxGroup = createSelector(selectTableData, (subState) => {
  let countryGroup = new Set();
  subState.map((value) => countryGroup.add(value.country));
  return { countryGroup };
});

const totalMatch = createSelector(selectTableData, (subState) => {
  const matchCount = subState.filter((item) => item.matchStatus === "Match");
  return matchCount.length;
});

const highRiskCount = createSelector(selectTableData, (subState) => {
  const riskCount = subState.filter((item) => item.riskLevel === "High");
  return riskCount.length;
});

const WarningCount = createSelector(selectTableData, (subState) => {
  const warningCount = subState.filter((item) => item.watchList.includes("W"));
  return warningCount.length;
});

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
  WarningCount
};
