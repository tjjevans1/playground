import React, { useContext } from "react";

import Filter from "../Filter/Filter";

import { FilterContext } from "../../contexts/Filter/filter-context";

function FilterGroup(props) {
  const filterContext = useContext(FilterContext);
  return (
    <div>
      {filterContext.filters.map((filter, key) => {
        return <Filter filter={filter} key={key} />;
      })}
    </div>
  );
}

export default FilterGroup;
