import React from 'react';
import axios from 'axios';
import Node from '../Node/Node';
import FilterGroup from '../FilterGroup/FilterGroup';

const url = '/rest/pages';

const ALL_ID = 'all';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      filters: [],
    };

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterNodes = this.filterNodes.bind(this);
  }

  filterNodes() {
    const tests = [];
    
    this.state.filters.forEach(filter => {
      const values = filter.options.filter(option => {
        return option.active;
      }).map(option => {
        return option.id.toString();
      });

      if (values.length > 0) {
        tests.push({
          id: filter.id,
          operator: filter.operator,
          values: values,
          key: filter.testKey,
        });
      }
    });

    const nodes = this.state.data.filter(node => {
      let pass = true;

      tests.forEach(test => {
        switch(test.operator) {
          case 'and':
            test.values.forEach(value => {
              if (!node[test.key].includes(value)) {
                pass = false;
              }
            });           
            break;
          case 'in':
          case 'or':
            pass = false;
            test.values.forEach(value => {
              if (node[test.key].includes(value)) {
                pass = true;
              }
            }); 
            break;
        }
        return pass;
      });
      
      return pass;
    });
    return nodes;
  }

  buildFilters() {
    const filters = window.drupalSettings.playground.pages_react.filters.map(filter => {
      filter.options = [
        {
          'id': ALL_ID,
          'label': 'All'
        },
        ...filter.options 
      ];
      
      return filter;
    });

    filters.map(filter => {
      return filter.options.map(option => {
        return option.active = false;
      });
    })

    return filters;
  }

  handleFilterChange(filter_id, option_id) {
    const filters = this.state.filters.map(filter => {
      if (filter.id === filter_id) {
        filter.options.map(option => {
          if (option_id === ALL_ID) {
            option.active = false;
          } else {
            switch(filter.operator) {
              case 'in':
                if (option.id === option_id) {
                  option.active = !option.active;
                } else {
                  option.active = false;
                }
                break;
              case 'or':
              case 'and':
                if (option.id === option_id) {
                  option.active = !option.active;
                }
                break;
            }
          }

          return option;
        })
      }

      return filter;
    });

    this.setState({filters: filters});
  };

  handleResponseData(data) {
    this.setState({
      data: data,
      filters: this.buildFilters()
    });
  }

  componentDidMount() {
    this.setState({loading: true});
    
    axios.get(url)
      .then(res => {
        this.handleResponseData(res.data);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if(this.state.loading) {
      return (<div>Loading...</div>);
    }

    const nodes = this.filterNodes();

    return (
      <div>
        <FilterGroup 
          filters={this.state.filters} 
          handleFilterChange={this.handleFilterChange}
        />
        <div>
          {nodes.map((node, key) => {
            return (
              <Node 
              key={key}
              node={node}
              />
              );
          })}
        </div>
      </div>
    );
  }
}

export default App;
