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
        <span className="seriesTitle">{this.props.ser.seriesTitle}</span><br />
        {this.props.ser.author}
      </li>
    );
  }
}
 
CatEach.propTypes = {
  ser: PropTypes.object.isRequired,
};