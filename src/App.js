import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Header from './components/Header'

class App extends Component {

  state = {
    sideBarOpen: false
  }

  render(){
    return(
      <main>
        <Header />
        <Map />
      </main>
    )
  }
}

export default App;
