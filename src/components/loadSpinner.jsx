import React, { Component } from 'react';
class LoadSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className ={this.props.active ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <i className="fas fa-circle-notch fa-spin fa-5x iconTurkiz"></i>
      </div>
    );
  }
}

export default LoadSpinner;