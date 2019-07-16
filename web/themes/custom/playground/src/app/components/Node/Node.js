import React from 'react';

import ReactHtmlParser from 'react-html-parser';

import Tags from '../Tags/Tags';

class Node extends React.Component {  
  render() {
    return (
      <div>
        <a href={this.props.node.view_node}><h2>{this.props.node.title}</h2></a>
        {ReactHtmlParser(this.props.node.body)}
        <Tags tags={this.props.node.field_tags} />
        <ul>
          <li><a href={this.props.node.view_node}>Read more</a></li>
        </ul>
      </div>
    );
  }
}

export default Node;
