import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { SeriesList } from '../api/seriesList.js'; 
import Catalog from './Catalog.jsx';
 
// App component - represents the whole app
class App extends Component {
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Series Tracker</h1>
        </header>
        <Catalog seriesList={this.props.seriesList} />
        
      </div>
    );
  }
}

App.propTypes = {
  seriesList: PropTypes.array.isRequired,
};
 
export default createContainer(() => {
  return {
    seriesList: SeriesList.find({}).fetch(),
  };
}, App);
