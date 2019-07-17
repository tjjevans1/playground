import React from 'react';

import Filter from '../Filter/Filter';

function FilterGroup (props) {
  return (
    <div>
      {props.filters.map((filter, key) => {
        return (
          <Filter 
            filter={filter} 
            key={key}
            />
        );
      })}
    </div>
  );
}

export default FilterGroup;
