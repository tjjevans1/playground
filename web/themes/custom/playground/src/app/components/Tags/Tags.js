import React from 'react';

function Tags (props) {
  let tags = [];

  if (props.tags.length > 0) {
    tags = props.tags.split(', ').map(tag => {
      return parseInt(tag) ? parseInt(tag) : null;
    });
  }

  return (
    <div>
      {tags.map((tag, key) => {
        return <span key={key}>{tag}</span>;
      })}
    </div>
  );
}

export default Tags;
