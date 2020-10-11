import React from "react";
import "./groupCheckBox.css";

function GroupCheckbox(props) {
  const {
    options,
    name,
    changeHandler,
    selectedValue,
    selectAll,
  } = props;

  return (
    <div className="checkbox-grp">
      <h5 className="checkbox-label">{name}</h5>
      <label className="custom-checkbox">
        All
        <input
          type="checkbox"
          id="all"
          name="all"
          value="all"
          checked={options.length === selectedValue.length}
          onChange={selectAll}
        />
        <span className="checkmark"></span>
      </label>

      {options.map((option, index) => {
        return (
          <label className="custom-checkbox">
            {option.label || option}
            <input
              type="checkbox"
              id={option.value || option}
              name={name}
              value={option.value || option}
              onChange={changeHandler}
              checked={selectedValue.includes(option.value || option)}
            />
            <span className="checkmark"></span>
          </label>
        );
      })}
    </div>
  );
}

export default GroupCheckbox;
