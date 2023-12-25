import { makeAutoObservable } from "mobx";

export default class AdressStore {
  constructor() {
    this._countries = [];
    this._cities = [];
    this._country = {};
    this._city =  localStorage.getItem('city') ? JSON.parse(localStorage.getItem('city')) :  {
      lat: 	55.7522,
      lng: 37.6156,
      value: "Москва",
      selected: false
    };
    this._country_detected = true;

    this._location = {
      lat: "",
      lng: "",
      speed: "",
      status: "",
      fetch: false,
    };

    makeAutoObservable(this);
  }

  setCountries(value) {
    this._countries = value;
  }

  get countries() {
    return this._countries;
  }

  setCountry(value) {
    this._country = value;
    localStorage.setItem("country", JSON.stringify(value));
  }
  setCity(value) {
    this._city = value;
    localStorage.setItem("city", JSON.stringify(value));
  }


  get country() {
    return this._country;
  }

  get city() {
    return this._city;
  }

  setCountryDetected(value) {
    this._country_detected = value;
  }

  get country_detected() {
    return this._country_detected;
  }

  setCities(value) {
    this._cities = value;
  }

  get cities() {
    return this._cities;
  }

  setLocation(value, option) {
    this._location[option] = value;
  }

  get location() {
    return this._location;
  }
}
