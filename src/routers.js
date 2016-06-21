import React from 'react';
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {Router, Route, browserHistory, Redirect} from 'react-router';

import './styles/app.css';

const __GAPI_KEY__="abc123";

const Home = React.createClass({
  onReady: function() {
   // When the map is ready and mounted
 },
  render: function(){
    return <div>Hello World Home!!
      <Map
         onReady={this.onReady.bind(this)}
         google={this.props.google} />
    </div>;
  }
})
 GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Home)

const routers = (
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Redirect from="*" to="/" />
    </Router>
  )


export default routers;
