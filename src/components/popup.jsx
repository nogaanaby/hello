import React, { Component } from 'react';

class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className ={this.props.active ? 'modal is-active' : 'modal'}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
              <p className="modal-card-title">{this.props.title}</p>
              <button className="delete" aria-label="close" onClick={this.props.onClose}></button>
          </header>
          <section className="modal-card-body">
            {this.props.children}
          </section>
          <footer className="modal-card-foot">
          <button className="button is-success" type="submit" onClick={this.props.onSubmit}>{this.props.submitButtonText}</button>
            <button className="button" onClick={this.props.onClose}>Cancel</button>
          </footer>
        </div>
      </div>
    )};
  }

export default Popup;