import React, { Component, PropTypes } from 'react';
import { SeriesList } from '../api/seriesList.js'; 
import SeryEach from './SeryEach.jsx';
 
// App component - represents the whole app
export default class Sery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: '',
      yearInput: ''
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
    const addTitle = this.state.titleInput;
    const addYear = this.state.yearInput;
    SeriesList.insert({
      author: addAuthor,
      seriesTitle: addSeries
    });
    this.setState({titleInput: '', yearInput: ''})
  }

  renderBooks() {
    if (this.props.onDisplay === "front") {
      return <h1>Series Tracker Home</h1>;
    } else {
      let seriesLive = this.props.seriesList.find(x => x._id === this.props.onDisplay);
      let volumes = seriesLive['volumes'];
      console.log(volumes);
      // return seriesLive.map((book) => (
      //   <SeryEach key={book._id} book={book} />
      // ));
    }

  }
 
  render() {
    return (
      <div className="sery">
 
        <ul>
          {this.renderBooks()}
        </ul>

        <form className="new-task" onSubmit={this.handleSubmit} >
          <input
            type="text"
            name="titleInput"
            value={this.state.titleInput}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="yearInput"
            value={this.state.yearInput}
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

Sery.propTypes = {
  seriesList: PropTypes.array.isRequired,
};
