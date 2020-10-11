import React, { useState, useEffect } from "react";
import "./sidebar.css";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import GroupCheckbox from "../GroupCheckbox/index";
import { formatDate } from "../../utils/helper";
import {
  riskLevel,
  pepClass,
  watchList,
} from "../../Data/config";
import {
  updateMatchingPercentage,
  updateCountryOrigin,
  updateRiskLevel,
  updateWatchList,
  updatePepClass,
  updateFromDate,
  updateToDate,
} from "../../Store/action";

function SideBar(props) {
  const {
    checkBoxGroup,
    dispatch,
    matchPercentage,
    countryOrigin,
    watchList: watchListData,
    riskLevel: riskLevelData,
    pepClass: pepClassData,
    fromDate,
    toDate,
  } = props;
  const { countryGroup } = checkBoxGroup;
  const [match, setMatch] = useState(100);
  const [selectedCountry, changeCountry] = useState([]);
  const [selectedRiskLevel, changeRiskLevel] = useState([]);
  const [selectedWatchList, changeWatchList] = useState([]);
  const [selectedPepClass, changePepClass] = useState([]);

  useEffect(() => {
    setMatch(matchPercentage);
  }, [matchPercentage]);

  const matchChangeHandler = (event, newValue) => {
    setMatch(newValue);
    dispatch(updateMatchingPercentage(newValue));
  };

  const watchListChangeHandler = (event) => {
    let watchListState = selectedWatchList;
    if (
      watchListState.length > 0 &&
      watchListState.indexOf(event.target.value) > -1
    ) {
      watchListState.splice(watchListState.indexOf(event.target.value), 1);

      changeWatchList(watchListState);
      dispatch(updateWatchList(watchListState));
    } else {
      watchListState.push(event.target.value);
      changeWatchList(watchListState);
      dispatch(updateWatchList(watchListState));
    }
    console.log(selectedWatchList);
  };

  const pepClassChangeHandler = (event) => {
    let pepClass = selectedPepClass;
    if (pepClass.length > 0 && pepClass.indexOf(event.target.value) > -1) {
      pepClass.splice(pepClass.indexOf(event.target.value), 1);

      changePepClass(pepClass);
      dispatch(updatePepClass(pepClass));
    } else {
      pepClass.push(event.target.value);
      changePepClass(pepClass);
      dispatch(updatePepClass(pepClass));
    }
    console.log(selectedPepClass);
  };

  const countryChangeHandler = (event) => {
    let countries = selectedCountry;
    if (countries.length > 0 && countries.indexOf(event.target.value) > -1) {
      countries.splice(countries.indexOf(event.target.value), 1);

      changeCountry(countries);
      dispatch(updateCountryOrigin(countries));
    } else {
      countries.push(event.target.value);
      changeCountry(countries);
      dispatch(updateCountryOrigin(countries));
    }
    console.log(selectedCountry);
  };

  const riskLevelChangeHandler = (event) => {
    let riskLevels = selectedRiskLevel;
    if (riskLevels.length > 0 && riskLevels.indexOf(event.target.value) > -1) {
      riskLevels.splice(riskLevels.indexOf(event.target.value), 1);

      changeRiskLevel(riskLevels);
      dispatch(updateRiskLevel(riskLevels));
    } else {
      riskLevels.push(event.target.value);
      changeRiskLevel(riskLevels);
      dispatch(updateRiskLevel(riskLevels));
    }
  };

  const fromDateChangeHandler = (event) => {
    dispatch(updateFromDate(event.target.value));
  };

  const toDateChangeHandler = (event) => {
    dispatch(updateToDate(event.target.value));
  };

  const clearFilter = () => {
    dispatch(updateMatchingPercentage(100));
    dispatch(updateWatchList(["S", "F&P", "W"]));
    dispatch(updatePepClass(["1", "2", "3", "4"]));
    dispatch(updateCountryOrigin(["India", "Russia", "UK", "Mexico", "US"]));
    dispatch(updateRiskLevel(["High", "Medium", "Low"]));
    dispatch(updateFromDate("01/01/1980"));
    dispatch(updateToDate(new Date().toLocaleDateString()));
  }

  const selectAllWatchList = () => {
    dispatch(updateWatchList(["S", "F&P", "W"]));
  }

  const selectAllPepClass = () => {
    dispatch(updatePepClass(["1", "2", "3", "4"]));
  }

  const selectAllCountryOrigin = () => {
    dispatch(updateCountryOrigin(["India", "Russia", "UK", "Mexico", "US"]));
  }

  const selectAllRiskLevel = () => {
    dispatch(updateRiskLevel(["High", "Medium", "Low"]));
  }

  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 40,
      label: "40%",
    },
    {
      value: 60,
      label: "60%",
    },
    {
      value: 80,
      label: "80%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div className="sidebar">
      <div className="filter-head">
        <h5 className="filter-title">Filters</h5>
        <Button variant="outlined" onClick={clearFilter}>Clear Filters</Button>
      </div>
      <div className="slider-filter-grp">
        <h5 className="filter-label">Matching %</h5>
        <Slider
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          value={match}
          onChange={matchChangeHandler}
        />
      </div>
      <div className="date-filter-grp">
        <h5 className="filter-label">Date Range</h5>
        <TextField
          id="date"
          label="From"
          type="date"
          defaultValue={formatDate(fromDate)}
          onChange={fromDateChangeHandler}
          onBlur={fromDateChangeHandler}
        />
        <TextField
          id="date"
          label="To"
          type="date"
          defaultValue={formatDate(toDate)}
          onChange={toDateChangeHandler}
          onBlur={toDateChangeHandler}
        />
      </div>
      <GroupCheckbox
        options={[...countryGroup]}
        name="Country of origin"
        changeHandler={countryChangeHandler}
        selectedValue={countryOrigin}
        selectAll={selectAllCountryOrigin}
        dispatch={dispatch}
      />
      <GroupCheckbox
        options={[...riskLevel]}
        name="Risk level"
        changeHandler={riskLevelChangeHandler}
        selectedValue={riskLevelData}
        selectAll={selectAllRiskLevel}
        dispatch={dispatch}
      />
      <GroupCheckbox
        options={[...watchList]}
        name="Watch list"
        changeHandler={watchListChangeHandler}
        selectedValue={watchListData}
        selectAll={selectAllWatchList}
        dispatch={dispatch}
      />
      <GroupCheckbox
        options={[...pepClass]}
        name="PEP Class"
        changeHandler={pepClassChangeHandler}
        selectedValue={pepClassData}
        selectAll={selectAllPepClass}
        dispatch={dispatch}
      />
    </div>
  );
}

export default SideBar;
