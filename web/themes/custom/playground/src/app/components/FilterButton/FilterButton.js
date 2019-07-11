import React from 'react';

const CLASSES = {
  filterButton: 'pg-filter-button',
  isActive: 'is-active'
};

class FilterButton extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.handleButtonClick(this.props.option.id);
  }

  render() {
    let classes = [
      CLASSES.filterButton
    ];

    if(this.props.option.active) {
      classes.push(CLASSES.isActive);
    }

    return (
      <button 
        className={classes.join(' ')}
        onClick={this.handleClick}>
        {this.props.option.label}
      </button>
    );
  }
}

export default FilterButton;
