import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { SeriesList } from '../api/seriesList.js'; 
import Series from './Series.jsx';
 
// App component - represents the whole app
class App extends Component {
 
  renderSeries() {
    return this.props.seriesList.map((ser) => (
      <Series key={ser._id} ser={ser} />
    ));
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Series Tracker</h1>
        </header>
 
        <ul>
          {this.renderSeries()}
        </ul>
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
