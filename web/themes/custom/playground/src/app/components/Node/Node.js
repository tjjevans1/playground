import React from 'react';

import ReactHtmlParser from 'react-html-parser';

import Tags from '../Tags/Tags';

function Node (props) {  
  return (
    <div>
      <a href={props.node.view_node}><h2>{props.node.title}</h2></a>
      {ReactHtmlParser(props.node.body)}
      <Tags tags={props.node.field_tags} fieldId="field_tags"/>
      <ul>
        <li><a href={props.node.view_node}>Read more</a></li>
      </ul>
    </div>
  );
}

export default Node;
