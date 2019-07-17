import React from 'react';

import FilterButton from '../FilterButton/FilterButton';

function Filter(props) {

  function handleButtonClick(option_id) {
    props.handleFilterChange(props.filter.id, option_id);
  }

  return (
    <div>
      <h5>{props.filter.label}</h5>
      {props.filter.options.map((option, key) => {
        return (
          <FilterButton
            key={key} 
            option={option} 
            filterId={props.filter.id}
            handleButtonClick={handleButtonClick}
          />
        );
      })}
    </div>
  );
}

export default Filter;
