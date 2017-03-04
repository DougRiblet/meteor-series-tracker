import React, { Component, PropTypes } from 'react';
 
export default class CatEach extends Component {
  render() {
    return (
      <li>{this.props.ser.author}, {this.props.ser.seriesTitle}</li>
    );
  }
}
 
CatEach.propTypes = {
  ser: PropTypes.object.isRequired,
};