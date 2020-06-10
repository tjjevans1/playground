import React, { useState, useEffect } from "react";
import axios from "axios";
import Node from "../Node/Node";
import FilterGroup from "../FilterGroup/FilterGroup";
import SortGroup from "../SortGroup/SortGroup";
import { FilterContext } from "../../contexts/Filter/filter-context";
import { SortContext } from "../../contexts/Sort/sort-context";

const url = "/rest/pages";

const ALL_ID = "all";

function App(props) {
  const [stateLoading, setLoading] = useState(false);
  const [stateData, setData] = useState([]);
  const [stateFilters, setFilters] = useState([]);
  const [stateSorts, setSorts] = useState([]);

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

  function getSortFunction(sort) {
    let sortFunction = () => 0.5 - Math.random();

    if (sort && sort.id !== "none") {
      sortFunction = (a, b) => {
        console.log(a[sort.id] - b[sort.id]);

        if (sort.direction === "ASC") {
          return a[sort.id] - b[sort.id];
        }

        return b[sort.id] - a[sort.id];
      };
    }

    return sortFunction;
  }

  function sortNodes() {
    const activeSort = stateSorts.filter(sort => sort.active).pop();

    let nodes = stateData.sort(getSortFunction(activeSort));

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

  function buildSorts() {
    const sorts = window.drupalSettings.playground.pages_react.sorts.map(
      sort => {
        sort["active"] = false;
        return sort;
      }
    );

    sorts.unshift({
      id: "none",
      label: "None",
      active: true
    });

    return sorts;
  }

  function handleSortChange(sort_id) {
    const sorts = stateSorts.map(sort => {
      if (sort.id === sort_id) {
        if (sort.active && sort.id !== "none") {
          sort.direction = sort.direction === "ASC" ? "DESC" : "ASC";
        }

        sort.active = true;
      } else {
        sort.active = false;
      }

      return sort;
    });

    setSorts(sorts);
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
    setSorts(buildSorts());
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

  let nodes = filterNodes();
  nodes = sortNodes();

  return (
    <FilterContext.Provider
      value={{
        filters: stateFilters,
        updateFilter: handleFilterChange
      }}
    >
      <SortContext.Provider
        value={{
          sorts: stateSorts,
          updateSort: handleSortChange
        }}
      >
        <div>
          <FilterGroup />
          <SortGroup />
          <div>
            {nodes.map((node, key) => {
              return <Node key={key} node={node} />;
            })}
          </div>
        </div>
      </SortContext.Provider>
    </FilterContext.Provider>
  );
}

export default App;
