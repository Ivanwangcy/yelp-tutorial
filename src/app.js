import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/app.css';
import 'font-awesome/css/font-awesome.css';

import {browserHistory} from 'react-router';

import App from './containers/App/App';
import routers from './routers';

// console.log(routers);

// var routers = makeRouters()
// class App extends Component{
//   render() {
//     return (
//       <div className={styles['container']}>
//         <h1>Environment: {__NODE_ENV__}</h1>
//         Text text text<i className='fa fa-star'></i>
//       </div>
//     );
//   }
// };

const mountNode = document.querySelector('#root');
ReactDOM.render(<App routers={routers}/>, mountNode);
