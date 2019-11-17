import React, { useContext } from "react";
import { FilterContext } from "../../contexts/Filter/filter-context";

function Tags(props) {
  const filterContext = useContext(FilterContext);

  let tags = [];

  if (props.tags.length > 0) {
    tags = props.tags.split(", ").map(tag => {
      return parseInt(tag) ? parseInt(tag) : null;
    });
  }

  const filter = filterContext.filters
    .filter(filter => filter.testKey === props.fieldId)
    .shift();

  tags = tags.map(tag => {
    return filter.options.filter(option => option.id === tag).shift().label;
  });

  return (
    <div>
      {tags.map((tag, key) => {
        return <span key={key}>{tag}</span>;
      })}
    </div>
  );
}

export default Tags;
