import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cinema from './components/cinema';
import Header from './components/header';
import {Provider} from 'react-redux'

import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Header/>
        <div className="body">
          <Cinema/>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;
