import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {
  constructor(parent, position = null) {
    this.parent = parent;
    this.parentElement = null;
    this.position = position || { // the API doesn't work from Madagascar, so I have to add these default coordinates
      lat: 43.814540699999995,
      lon: -111.78491029999999
    };
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }

  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.intiPos(), and display some quakes by calling this.getQuakesByRadius()
    this.parentElement = document.querySelector(this.parent);
    await this.initPos();
    this.getQuakesByRadius(100);
  }

  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        const posFull = await getLocation();

        // if we get the location back then set the latitude and longitude into this.position
        this.position.lat = posFull.coords.latitude;
        this.position.lon = posFull.coords.longitude;
        //console.log(posFull);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100) {
    //set a loading message in case it takes long to get the quakes
    this.parentElement.innerHTML = '<li>Loading...</li>';
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      100
    );

    console.log(quakeList);

    // // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // // add a listener to the new list of quakes to allow drill down in to the details. The listener should call this.getQuakeDetails on the targeted element
    // this.parentElement.addEventListener('touchend', e => {
    //   this.getQuakeDetails(e.target.dataset.id);
    // });
  }
  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided, then send them to the view to be displayed
    const quake = this.quakes.getQuakeById(quakeId);
    this.quakesView.renderQuake(quake, this.parentElement);
  }
}