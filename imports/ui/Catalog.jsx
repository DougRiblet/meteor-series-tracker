import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { SeriesList } from '../api/seriesList.js'; 
import CatEach from './CatEach.jsx';

export default class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorInput: '',
      seriesInput: '',
      showAddSeries: false
    };
    this.toggleShowAddSeries = this.toggleShowAddSeries.bind(this);
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
    Meteor.call('seriesList.insertSeries', addAuthor, addSeries);
    this.setState({authorInput: '', seriesInput: ''})
  }

  toggleShowAddSeries() {
    this.setState({showAddSeries: !this.state.showAddSeries})
  }

  renderSeries() {
    return this.props.seriesList.map((ser) => (
      <CatEach
        key={ser._id}
        ser={ser}
        changeDisplay={(str) => this.props.changeDisplay(str)}
      />
    ));
  }
 
  render() {
    let caret = this.state.showAddSeries ? `fa fa-caret-down` : `fa fa-caret-up`;

    return (
      <div className="catalog">
 
        <ul>
          {this.renderSeries()}
        </ul>

        { this.props.currentUser ?
          <p><span className="addFormHead" onClick={this.toggleShowAddSeries}>
            Add New Series <i className={caret}></i>
          </span></p>: ''
        }

        { this.props.currentUser && this.state.showAddSeries ?
          <form className="new-series" onSubmit={this.handleSubmit} >
            <input
              type="text"
              name="seriesInput"
              placeholder="Series Title"
              value={this.state.seriesInput}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="authorInput"
              placeholder="Author"
              value={this.state.authorInput}
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

Catalog.propTypes = {
  seriesList: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};
