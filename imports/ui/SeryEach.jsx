import React, { Component, PropTypes } from 'react';
import { SeriesList } from '../api/seriesList.js'; 

export default class SeryEach extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick() {
    const newHaveRead = !this.props.book.haveRead;
    const seriesID = this.props.onDisplay;
    const volumeTitle = this.props.book.title;
    Meteor.call('seriesList.updateHaveRead', seriesID, volumeTitle, newHaveRead);
  }

  render() {
    let haveRead = this.props.book.haveRead ? `fa fa-check` : `fa fa-asterisk` ;
    return (
      <li>
        <span onClick={this.handleIconClick}>
          <i className={haveRead}></i>
        </span>
        <span className="bookTitle">{this.props.book.title}</span> {this.props.book.year}
      </li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};