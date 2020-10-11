import {
  UPDATE_TABLE_DATA,
  UPDATE_MATCHING_PERCENTAGE,
  UPDATE_COUNTRY_ORIGIN,
  UPDATE_RISK_LEVEL,
  UPDATE_WATCH_LIST,
  UPDATE_PEP_CLASS,
  UPDATE_FROM_DATE,
  UPDATE_TO_DATE,
  UPDATE_TABLE_HEADING
} from "./constants";

export const updateTableData = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TABLE_DATA, payload: value });
  };
};

export const updateMatchingPercentage = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_MATCHING_PERCENTAGE, payload: value });
  };
};

export const updateCountryOrigin = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_COUNTRY_ORIGIN, payload: value });
  };
};

export const updateRiskLevel = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_RISK_LEVEL, payload: value });
  };
};

export const updateWatchList = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_WATCH_LIST, payload: value });
  };
};

export const updatePepClass = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_PEP_CLASS, payload: value });
  };
};

export const updateFromDate = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_FROM_DATE, payload: value });
  };
}

export const updateToDate = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TO_DATE, payload: value });
  };
}

export const updateTableHeading = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TABLE_HEADING, payload: value });
  };
}

