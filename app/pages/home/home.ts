import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation, Keyboard } from 'ionic-native';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  
  restaurants: Array<Object>;
  searchTerm: string;
  constructor(public navCtrl: NavController, public http: Http, public platform: Platform) {
    this.getRestaurants();
  }

  getRestaurants() {
    Keyboard.close();
    this.platform.ready().then(
      () => Geolocation.getCurrentPosition().then(
        location => this.request(location)
      )
    )
  }

  request(location: Object) {
    let url = 'http://ionic-workshop-api.herokuapp.com/search';
    let query = `?lat=${location['coords']['latitude']}&long=${location['coords']['longitude']}`;
    if (this.searchTerm) {
      query += `&q=${this.searchTerm}`;
    }
    this.http.get(url + query)
      .map(res => res.json())
      .subscribe(res => this.restaurants = res['results']);
  }

  getArray(size) {
    return new Array(size);
  }
}
