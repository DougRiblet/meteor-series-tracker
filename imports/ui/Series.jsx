import React, { Component, PropTypes } from 'react';
 
export default class Series extends Component {
  render() {
    return (
      <li>{this.props.ser.author}, {this.props.ser.seriesTitle}</li>
    );
  }
}
 
Series.propTypes = {
  ser: PropTypes.object.isRequired,
};