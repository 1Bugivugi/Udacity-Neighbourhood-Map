import React, { Component } from 'react';
import '../App.css'
import SideBar from './SideBar'

class Header extends Component {
  render(){
    return(
      <div>
        <div className='header'>
          <SideBar />
          Neighbourhood Map
        </div>
      </div>
    )
  }
}
export default Header;
