import React from "react";

import SortButton from "../SortButton/SortButton";

function SortGroup(props) {
  return (
    <div>
      <h5>Sort</h5>
      {props.sorts.map((sort, key) => {
        return <SortButton sort={sort} />;
      })}
    </div>
  );
}

export default SortGroup;
