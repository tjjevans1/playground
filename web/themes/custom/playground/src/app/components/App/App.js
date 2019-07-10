import React from 'react';
import axios from 'axios';
import Node from '../Node/Node';

const url = '/rest/pages';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: []
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    
    axios.get(url)
      .then(res => {
        this.setState({data: res.data})
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

    return (
      <div>
      
        {this.state.data.map((node, key) => {
          return (
            <Node 
              key={key}
              node={node}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
