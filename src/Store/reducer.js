import {
  UPDATE_TABLE_DATA,
  UPDATE_MATCHING_PERCENTAGE,
  UPDATE_COUNTRY_ORIGIN,
  UPDATE_RISK_LEVEL,
  UPDATE_WATCH_LIST,
  UPDATE_PEP_CLASS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_TABLE_HEADING,
} from "./constants";

export const initialState = {
  tableData: [],
  matchingPercentage: 100,
  fromDate: "01/01/1980",
  toDate: new Date().toLocaleDateString(),
  countryOrigin: ["India", "Russia", "UK", "Mexico", "US"],
  riskLevel: ["High", "Medium", "Low"],
  watchList: ["S", "F&P", "W"],
  PepClass: ["1", "2", "3", "4"],
  tableHeading: [
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
  ],
};

export const dashboardTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case UPDATE_MATCHING_PERCENTAGE:
      return {
        ...state,
        matchingPercentage: action.payload,
      };
    case UPDATE_COUNTRY_ORIGIN:
      return {
        ...state,
        countryOrigin: [...action.payload],
      };
    case UPDATE_RISK_LEVEL:
      return {
        ...state,
        riskLevel: [...action.payload],
      };
    case UPDATE_WATCH_LIST:
      return {
        ...state,
        watchList: [...action.payload],
      };
    case UPDATE_PEP_CLASS:
      return {
        ...state,
        PepClass: [...action.payload],
      };
    case UPDATE_FROM_DATE:
      return {
        ...state,
        fromDate: action.payload,
      };
    case UPDATE_TO_DATE:
      return {
        ...state,
        toDate: action.payload,
      };
    case UPDATE_TABLE_HEADING:
      return {
        ...state,
        tableHeading: [...action.payload],
      };
    default:
      return state;
  }
};
