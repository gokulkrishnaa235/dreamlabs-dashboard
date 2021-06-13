import {
  UPDATE_TABLE_DATA,
} from "./constants";

export const updateTableData = (value) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_TABLE_DATA, payload: value });
  };
};


