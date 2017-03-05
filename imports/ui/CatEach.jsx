import React, { Component, PropTypes } from 'react';
 
export default class CatEach extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.changeDisplay(this.props.ser._id);
  }

  render() {
    return (
      <li onClick={this.handleClick}>
        {this.props.ser.author}<br />{this.props.ser.seriesTitle}
      </li>
    );
  }
}
 
CatEach.propTypes = {
  ser: PropTypes.object.isRequired,
};