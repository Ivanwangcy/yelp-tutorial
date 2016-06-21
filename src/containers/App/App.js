import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import styles from './styles.module.css';

class App extends Component {

  static propTypes = {
    // history: PropTypes.object.isRequired,
    routers: PropTypes.object.isRequired
  }

  // get content() {
  //   return (
  //     <Router
  //       history={this.props.history}
  //       routers={this.props.routers}
  //       />
  //   );
  // }

  render() {
    return (
      // <div className={styles.wrapper}>
      //   <h1>
      //     <i className="fa fa-star"></i>
      //     Environment: {__NODE_ENV__}</h1>
      // </div>
      <div style={{height: '100%'}}>
        {this.props.routers}
      </div>

    )
  }
};

export default App;
