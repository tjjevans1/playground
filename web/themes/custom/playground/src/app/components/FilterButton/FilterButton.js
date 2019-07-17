import React, { useContext } from 'react';
import { FilterContext } from '../../contexts/Filter/filter-context';

const CLASSES = {
  filterButton: 'pg-filter-button',
  isActive: 'is-active'
};

function FilterButton (props) {
  const filterContext = useContext(FilterContext);

  function handleClick() {
    filterContext.updateFilter(props.filterId, props.option.id);
  }

  let classes = [
    CLASSES.filterButton
  ];

  if (props.option.active) {
    classes.push(CLASSES.isActive);
  }

  return (
    <button 
      className={classes.join(' ')}
      onClick={handleClick}>
      {props.option.label}
    </button>
  );
}

export default FilterButton;
