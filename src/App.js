import React from "react";
import { connect } from "react-redux";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Dashboard from "./Components/Dashboard";
import {
  selectTableData,
} from "./Store/selector";
import { updateTableData } from "./Store/action";
import db from "./firebase";

import "./App.css";
class App extends React.Component {
  componentDidMount() {
    db.collection("inventory").onSnapshot((snapshot) =>
      this.props.updateTableData(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );
  }

  componentDidUpdate(prevProps) {
    //  db.collection("inventory").onSnapshot((snapshot) =>
    //   this.props.updateTableData(
    //     snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    //   )
    // );
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-container">
          <SideBar
            dispatch={this.props.dispatch}/>
          <Dashboard
            dispatch={this.props.dispatch}
            tableData={this.props.tableData}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tableData: selectTableData(state),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateTableData: (value) => dispatch(updateTableData(value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
