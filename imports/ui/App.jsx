import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { SeriesList } from '../api/seriesList.js';
import Catalog from './Catalog.jsx';
import Sery from './Sery.jsx';
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      onDisplay: "front"
    };
    this.changeDisplay = this.changeDisplay.bind(this);
  }

  changeDisplay(str) {
    this.setState({onDisplay: str})
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Series Tracker</h1>
        </header>
        <main>
          <Catalog
            seriesList={this.props.seriesList}
            changeDisplay={(str) => this.changeDisplay(str)}
          />
          <Sery
            seriesList={this.props.seriesList}
            onDisplay={this.state.onDisplay}
          />
        </main>
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
