import React, { useContext } from "react";

import SortButton from "../SortButton/SortButton";

import { SortContext } from "../../contexts/Sort/sort-context";

function SortGroup(props) {
  const sortContext = useContext(SortContext);
  return (
    <div>
      <h5>Sort</h5>
      {sortContext.sorts.map((sort, key) => {
        return <SortButton sort={sort} />;
      })}
    </div>
  );
}

export default SortGroup;
