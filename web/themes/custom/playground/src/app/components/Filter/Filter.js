import React from 'react';

import FilterButton from '../FilterButton/FilterButton';

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(option_id) {
    this.props.handleFilterChange(this.props.filter.id, option_id);
  }

  render() {
    return (
      <div>
        <h5>{this.props.filter.label}</h5>
        {this.props.filter.options.map((option, key) => {
          return (
            <FilterButton
              option={option} 
              key={key} 
              handleButtonClick={this.handleButtonClick}
            />
          );
        })}
      </div>
    );
  }
}

export default Filter;
