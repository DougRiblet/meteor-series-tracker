import React, { Component, PropTypes } from 'react';
 
export default class SeryEach extends Component {
  render() {
    let haveRead = this.props.book.haveRead ? `fa fa-check` : `fa fa-asterisk` ;
    return (
      <li>
        <i className={haveRead}></i> &nbsp; 
        {this.props.book.title}, 
        {this.props.book.year}
      </li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};