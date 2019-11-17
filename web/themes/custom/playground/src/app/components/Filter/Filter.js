import React from "react";

import FilterButton from "../FilterButton/FilterButton";

function Filter(props) {
  return (
    <div>
      <h5>{props.filter.label}</h5>
      {props.filter.options.map((option, key) => {
        return (
          <FilterButton key={key} option={option} filterId={props.filter.id} />
        );
      })}
    </div>
  );
}

export default Filter;
