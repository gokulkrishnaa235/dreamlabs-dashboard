import React from "react";
import { connect } from "react-redux";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Dashboard from "./Components/Dashboard";
import {
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
} from "./Store/selector";
import { updateTableData } from "./Store/action";
import { sample } from "../src/Data/sample";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.updateTableData(sample);
  }

  componentDidUpdate(prevProps) {

  console.log("Table updated !!", this.props.filterCount);
    
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">
          <SideBar
            dispatch={this.props.dispatch}
            checkBoxGroup={this.props.checkBoxGroup}
            matchPercentage={this.props.matchPercentage}
            countryOrigin={this.props.countryOrigin}
            watchList={this.props.watchList}
            riskLevel={this.props.riskLevel}
            pepClass={this.props.pepClass}
            fromDate={this.props.fromDate}
            toDate={this.props.toDate}
            tableHeading={this.props.tableHeading}
          />
          <Dashboard
            dispatch={this.props.dispatch}
            tableData={this.props.filterCount}
            matchPercentage={this.props.matchPercentage}
            countryOrigin={this.props.countryOrigin}
            watchList={this.props.watchList}
            riskLevel={this.props.riskLevel}
            pepClass={this.props.pepClass}
            fromDate={this.props.fromDate}
            toDate={this.props.toDate}
            tableHeading={this.props.tableHeading}
            totalCount={this.props.totalCount}
            matchCount={this.props.matchCount}
            riskCount={this.props.riskCount}
            warningCount={this.props.warningCount}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: selectTableData(state),
  checkBoxGroup: selectCheckBoxGroup(state),
  matchPercentage: selectMatchingPercentage(state),
  countryOrigin: selectCountryOrigin(state),
  watchList: selectWatchList(state),
  riskLevel: selectRiskLevel(state),
  pepClass: selectPepClass(state),
  fromDate: selectFromDate(state),
  toDate: selectToDate(state),
  tableHeading: selectTableHeading(state),
  totalCount: dataCount(state),
  matchCount: totalMatch(state),
  riskCount: highRiskCount(state),
  warningCount: WarningCount(state),
  filterCount: filteredData(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateTableData: (value) => dispatch(updateTableData(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
