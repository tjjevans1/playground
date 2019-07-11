import React from 'react';

import Filter from '../Filter/Filter';

class FilterGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filter_id, option_id) {
    this.props.handleFilterChange(filter_id, option_id);
  }

  render() {
    return (
      <div>
        {this.props.filters.map((filter, key) => {
          return (
            <Filter 
              filter={filter} 
              key={key}
              handleFilterChange={this.handleFilterChange}
              />
          );
        })}
      </div>
    );
  }
}

export default FilterGroup;
