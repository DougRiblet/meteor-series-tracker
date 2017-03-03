import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { SeriesList } from '../api/seriesList.js'; 
import Series from './Series.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorInput: '',
      seriesInput: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const addAuthor = this.state.authorInput;
    const addSeries = this.state.seriesInput;
    SeriesList.insert({
      author: addAuthor,
      seriesTitle: addSeries
    });
    this.setState({authorInput: '', seriesInput: ''})
  }

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

        <form className="new-task" onSubmit={this.handleSubmit} >
          <input
            type="text"
            name="authorInput"
            value={this.state.authorInput}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="seriesInput"
            value={this.state.seriesInput}
            onChange={this.handleInputChange}
          />
          <input
            type="submit"
            value="Submit"
          />
        </form>
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
