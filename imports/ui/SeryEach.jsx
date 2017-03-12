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
    let hrfa = this.props.book.haveRead ? "fa fa-check-square" : "fa fa-minus-square";
    let hrow = this.props.book.haveRead ? "seryEachItem hrow" : "seryEachItem";
    return (
      <li className={hrow}>
        <span className="bookHaveRead" onClick={this.handleIconClick}>
          <i className={hrfa}></i>
        </span>
        <span className="bookTitle">{this.props.book.title}</span>
        <span className="bookYear">{this.props.book.year}</span>
      </li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};