import React from 'react';

class Tags extends React.Component {
  render() {
    let tags = [];

    if (this.props.tags.length > 0) {
      tags = this.props.tags.split(', ').map(tag => {
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
}

export default Tags;
