import { createSelector } from "reselect";
import { initialState } from "./reducer";

const dashboardState = (state = initialState) => state;

const selectTableData = createSelector(
  dashboardState,
  (subState) => subState.tableData
);



export {
  selectTableData,
};
