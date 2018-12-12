import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import SideBar from './SideBar'

class Map extends Component {

  state: {
    venues: [];
  }

  componentDidMount(){
    this.getVenues()
  }

/*
  Initializing a new map
*/

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.2672, lng: -97.7431},
        zoom: 13
      });

    /*
      Creating an Info Window
    */

    let infoWindow = new window.google.maps.InfoWindow() // {content: infoWindowContent}

    /*
      Looping through the venues array to create a marker for each instance
    */

    this.state.venues.map(myVenue => { // <-- looping through state.venue to create a marker and an infoWindow for each instance
      /*
        Creating a marker
      */

      let marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name,
        animation: window.google.maps.Animation.DROP,
      })


      let infoWindowContent = `${myVenue.venue.location.address}`
      let infoWindowContentName = `${myVenue.venue.name}`

      marker.addListener('click', () => {
        infoWindow.setContent('<div>' + '<div class="infoContent">' + infoWindowContent + '</div>' + infoWindowContentName + '</div>')
        infoWindow.open(map, marker)
      })
    })
  }

/*
  Invoking our outer function to load a script inside React, so it has access to it
*/

  loadMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyACKfranXXLfxanE5a_jhjxF0nE_Qph-Mw&v=3&callback=initMap')
    window.initMap = this.initMap
  }

/*
  Getting our venues from the FourSquare Places API
*/

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = { // <-- info to start working with axios
      client_id: 'S44FOYPH1XTS3QWHCAGDHU2PAZOWTSQMVR5ALVHR1VF4AZ3Y',
      client_secret: '1LT1GOD1E3Q25I5FGRW0UBOYVLLSTJWRTPSTIT32IWAEQRZM',
      ll: '30.2672, -97.7431',
      section: 'topPicks',
      v: '20181207' // All foursquare API requests require a version parameter. This gives developers control over the time period in which to call their continuously updated API.
      // radius: '10000'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        // console.log(response.data.response.groups[0].items)
        this.setState(() => {
          return{venues: response.data.response.groups[0].items}
        }, this.loadMap()) // <-- callback which is being executed ONLY as soon as all the data is fetched
      })
      .catch(error => {
        console.log(error)
      })
  }

  render(){
    return(
      <div id='map'>
        { this.state ? <SideBar
              venues={this.state.venues}
        /> : ''}
        <div id="page-wrap">

        </div>
      </div>
    )
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName('script')[0];  //(the reference of the script tag) selects the 1st script tag in the document
  let script = window.document.createElement('script'); //creating script tag, obv
  script.src = url;
  script.async = true;
  script.defer = true
  index.parentNode.insertBefore(script, index) //inserts our script before the very 1st one, to make ours 1st(to keep it at the very beginning of the scripts list)
}

export default Map;
