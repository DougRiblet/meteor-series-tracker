import React, { Component, PropTypes } from 'react';
 
export default class SeryEach extends Component {
  render() {
    return (
      <li>{this.props.book.title}, {this.props.book.year}</li>
    );
  }
}
 
SeryEach.propTypes = {
  book: PropTypes.object.isRequired,
};