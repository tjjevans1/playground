import React from 'react';

const CLASSES = {
  filterButton: 'pg-filter-button',
  isActive: 'is-active'
};

function FilterButton (props) {

  function handleClick() {
    props.handleButtonClick(props.option.id);
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
