import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { SeriesList } from '../api/seriesList.js'; 
import SeryEach from './SeryEach.jsx';

export default class Sery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: '',
      yearInput: '',
      showAddTitle: false
    };
    this.toggleShowAddTitle = this.toggleShowAddTitle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const seriesID = this.props.onDisplay;
    const addTitle = this.state.titleInput;
    const addYear = this.state.yearInput;
    Meteor.call('seriesList.insertVolume', seriesID, addTitle, addYear);
    this.setState({titleInput: '', yearInput: ''})
  }

  renderBooks() {
    if (this.props.onDisplay === "front") {
      return "";
    } else {
      let seriesLive = this.props.seriesList.find(x => x._id === this.props.onDisplay);
      let volumes = seriesLive['volumes'].sort((x,y) => x.year - y.year);
      return volumes.map((book) => (
        <SeryEach key={book._id} book={book} onDisplay={this.props.onDisplay} />
      ));
    }
  }

  renderSeryTitle() {
    if (this.props.onDisplay === "front") {
      return <h1 className="seryTitle">Series Tracker App</h1>;
    } else {
      let seriesLive = this.props.seriesList.find(x => x._id === this.props.onDisplay);
      return (
        <div>
          <h1 className="seryTitle">{seriesLive.seriesTitle}</h1>
          <h2 className="seryAuthor">{seriesLive.author}</h2>
        </div>
      );;
    }
  }

  toggleShowAddTitle() {
    this.setState({showAddTitle: !this.state.showAddTitle})
  }
 
  render() {
    let caret = this.state.showAddTitle ? `fa fa-caret-down` : `fa fa-caret-up`;

    return (
      <div className="sery">

        {this.renderSeryTitle()}

        <ul>
          {this.renderBooks()}
        </ul>
        
        { this.props.currentUser ?
          <p className="addFormP">
            <span className="addFormHead" onClick={this.toggleShowAddTitle}>
              Add New Title <i className={caret}></i>
            </span>
          </p> : ''
        }

        { this.props.currentUser && this.state.showAddTitle ?
          <form className="new-book" onSubmit={this.handleSubmit} >
            <input
              type="text"
              name="titleInput"
              placeholder="Book Title"
              value={this.state.titleInput}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="yearInput"
              placeholder="Year of Publication"
              value={this.state.yearInput}
              onChange={this.handleInputChange}
            />
            <input
              type="submit"
              value="Submit"
            />
          </form> : ''
        }
      </div>
    );
  }
}

Sery.propTypes = {
  seriesList: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};
