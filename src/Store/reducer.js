import {
  UPDATE_TABLE_DATA,
} from "./constants";

export const initialState = {
  tableData: [],
  
};

export const dashboardTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    default:
      return state;
  }
};
