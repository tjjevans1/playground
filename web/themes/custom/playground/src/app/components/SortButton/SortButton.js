import React from "react";

const CLASSES = {
  filterButton: "pg-filter-button",
  icon: "pg-icon",
  iconArrowUp: "pg-icon--arrow-up",
  iconArrowDown: "pg-icon--arrow-down",
  isActive: "is-active"
};

function SortButton(props) {
  let classes = [CLASSES.filterButton];

  if (props.sort.active) {
    classes.push(CLASSES.isActive);
  }

  let icon;
  let iconClasses = [CLASSES.icon];

  if (props.sort.direction == "ASC") {
    iconClasses.push(CLASSES.iconArrowUp);
    icon = <span className={iconClasses.join(" ")}></span>;
  }
  if (props.sort.direction == "DESC") {
    iconClasses.push(CLASSES.iconArrowDown);
    icon = <span className={iconClasses.join(" ")}></span>;
  }

  function handleClick() {
    console.log(props.sort);
  }

  return (
    <button className={classes.join(" ")} onClick={handleClick}>
      {props.sort.label}
      {icon}
    </button>
  );
}

export default SortButton;
