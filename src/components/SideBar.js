import React, { Component } from 'react';
import '../App.css';
import { slide as Menu } from 'react-burger-menu';

class SideBar extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })
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
          {this.props.venues && this.props.venues.map((myVenue, index) => (
              <li key={myVenue.venue.id}><a href='#' onClick={this.props.clickHandler}>{myVenue.venue.name}</a></li>
          ))}
        </ul>

      </Menu>
    )
  };
}

export default SideBar;
