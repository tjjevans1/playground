import React from 'react';

import Filter from '../Filter/Filter';

function FilterGroup (props) {

  function handleFilterChange(filter_id, option_id) {
    props.handleFilterChange(filter_id, option_id);
  }

  return (
    <div>
      {props.filters.map((filter, key) => {
        return (
          <Filter 
            filter={filter} 
            key={key}
            handleFilterChange={handleFilterChange}
            />
        );
      })}
    </div>
  );
}

export default FilterGroup;
