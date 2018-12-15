import React, { Component } from 'react';
import '../App.css';
import { slide as Menu } from 'react-burger-menu';
import MediaQuery from 'react-responsive';

class SideBar extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })
    this.props.filter(query)
  };


  // populateSideBar = () => {
  //   const getMenu = document.getElementById('menu');
  //   this.props.venues.map(myVenue => {
  //     const childElement = document.createElement('li');
  //     childElement.innerHTML={myVenue.venue.name}
  //     getMenu.appendChild(childElement)
  //   })
  // }

  render(){
    return (
        <Menu id='menu'>
          <input
            className="search-input"
            type="text"
            placeholder="Search for the cool venue"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <ul>
            {this.props.globMarkers && this.props.globMarkers.map((globMarker, index) => (
                <li key={index} onClick={() => {window.google.maps.event.trigger(globMarker, 'click')}}><a href='#'>{globMarker.title}</a></li>
            ))}
          </ul>
        </Menu>
    )
  };
}

export default SideBar;
