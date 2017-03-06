import React, { Component, PropTypes } from 'react';
 
export default class SeryEach extends Component {
  render() {
    let haveRead = this.props.book.haveRead ? `yes` : `no` ;
    return (
      <li>{haveRead} {this.props.book.title}, {this.props.book.year}</li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};