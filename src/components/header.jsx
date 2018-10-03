import React, { Component } from 'react';
import './icon.css';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <nav className="App-header">
          <div>
            <div className="icon-block">
              <i className="fa fa-film fa-4x fa-3dicon"></i>
            </div>
            <h1 className="App-title">Welcome To My Movie Gallery</h1>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;