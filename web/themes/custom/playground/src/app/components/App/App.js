import React, { useState, useEffect } from "react";
import axios from "axios";
import Node from "../Node/Node";
import FilterGroup from "../FilterGroup/FilterGroup";
import { FilterContext } from "../../contexts/Filter/filter-context";

const url = "/rest/pages";

const ALL_ID = "all";

function App(props) {
  const [stateLoading, setLoading] = useState(false);
  const [stateData, setData] = useState([]);
  const [stateFilters, setFilters] = useState([]);

  function getFilterValues(filter) {
    const values = filter.options
      .filter(option => {
        return option.active;
      })
      .map(option => {
        return option.id.toString();
      });

    return values;
  }

  function updateURL(filters) {
    const params = new URLSearchParams();

    filters.forEach(filter => {
      const values = getFilterValues(filter);

      if (values.length > 0) {
        values.forEach(value => {
          params.append(filter.id, value);
        });
      }
    });

    window.history.pushState({ filters: filters }, "", `?${params.toString()}`);
  }

  function filterNodes() {
    const tests = [];

    stateFilters.forEach(filter => {
      const values = getFilterValues(filter);

      if (values.length > 0) {
        tests.push({
          id: filter.id,
          operator: filter.operator,
          values: values,
          key: filter.testKey
        });
      }
    });

    const nodes = stateData.filter(node => {
      let pass = true;

      tests.forEach(test => {
        if (pass) {
          switch (test.operator) {
            case "and":
              test.values.forEach(value => {
                if (!node[test.key].includes(value)) {
                  pass = false;
                }
              });
              break;
            case "in":
            case "or":
              pass = false;
              test.values.forEach(value => {
                if (node[test.key].includes(value)) {
                  pass = true;
                }
              });
              break;
          }
        }
      });

      return pass;
    });
    return nodes;
  }

  function buildFilters() {
    const filters = window.drupalSettings.playground.pages_react.filters.map(
      filter => {
        filter.options = [
          {
            id: ALL_ID,
            label: "All"
          },
          ...filter.options
        ];

        return filter;
      }
    );

    const params = new URLSearchParams(window.location.search);

    filters.map(filter => {
      const values = params.getAll(filter.id);

      return filter.options.map(option => {
        return (option.active = values.includes(option.id.toString()));
      });
    });

    return filters;
  }

  function handleFilterChange(filter_id, option_id) {
    const filters = stateFilters.map(filter => {
      if (filter.id === filter_id) {
        filter.options.map(option => {
          if (option_id === ALL_ID) {
            option.active = false;
          } else {
            if (filter.multiple) {
              if (option.id === option_id) {
                option.active = !option.active;
              }
            } else {
              if (option.id === option_id) {
                option.active = !option.active;
              } else {
                option.active = false;
              }
            }
          }

          return option;
        });
      }

      return filter;
    });

    updateURL(filters);
    setFilters(filters);
  }

  function handleResponseData(data) {
    setData(data);
    setFilters(buildFilters());
  }

  useEffect(() => {
    if (stateData.length === 0 && !stateLoading) {
      setLoading(true);

      axios
        .get(url)
        .then(res => {
          handleResponseData(res.data);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  if (stateLoading) {
    return <div>Loading...</div>;
  }

  const nodes = filterNodes();

  return (
    <FilterContext.Provider
      value={{
        filters: stateFilters,
        updateFilter: handleFilterChange
      }}
    >
      <div>
        <FilterGroup filters={stateFilters} />
        <div>
          {nodes.map((node, key) => {
            return <Node key={key} node={node} />;
          })}
        </div>
      </div>
    </FilterContext.Provider>
  );
}

export default App;
