import React, { Component, PropTypes } from 'react';
import { SeriesList } from '../api/seriesList.js'; 

export default class SeryEach extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleIconClick = this.handleIconClick.bind(this);
  }

  handleIconClick() {
    let opposite = !this.props.book.haveRead
    SeriesList.update(
      {_id: this.props.onDisplay, "volumes._id": this.props.book._id},
      {$set: {"volumes.$.haveRead": opposite}}
    );
  }

  render() {
    let haveRead = this.props.book.haveRead ? `fa fa-check` : `fa fa-asterisk` ;
    return (
      <li>
        <span onClick={this.handleIconClick}>
          <i className={haveRead}></i>
        </span> &nbsp; 
        {this.props.book.title}, {this.props.book.year}
      </li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};