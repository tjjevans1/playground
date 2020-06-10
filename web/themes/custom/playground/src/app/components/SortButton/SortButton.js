import React, { useContext } from "react";

import { SortContext } from "../../contexts/Sort/sort-context";

const CLASSES = {
  filterButton: "pg-filter-button",
  icon: "pg-icon",
  iconArrowUp: "pg-icon--arrow-up",
  iconArrowDown: "pg-icon--arrow-down",
  isActive: "is-active"
};

function SortButton(props) {
  const sortContext = useContext(SortContext);

  let classes = [CLASSES.filterButton];

  if (props.sort.active) {
    classes.push(CLASSES.isActive);
  }

  let icon;
  let iconClasses = [CLASSES.icon];

  if (props.sort.direction == "ASC") {
    iconClasses.push(CLASSES.iconArrowUp);
  }

  if (props.sort.direction == "DESC") {
    iconClasses.push(CLASSES.iconArrowDown);
  }

  icon = <span className={iconClasses.join(" ")}></span>;

  function handleClick() {
    sortContext.updateSort(props.sort.id);
  }

  return (
    <button className={classes.join(" ")} onClick={handleClick}>
      {props.sort.label}
      {icon}
    </button>
  );
}

export default SortButton;
