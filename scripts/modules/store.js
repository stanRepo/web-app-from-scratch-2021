export default class Store {
  constructor() {
    this.stateDelete = (key) => {
      window.localStorage.removeItem(key);
      return true;
    };
    this.stateUpdate = (key, value) => {
      const string = JSON.stringify(value);
      window.localStorage.setItem(key, string);
      return true;
    };
    this.stateCreate = (key, value) => {
      const string = JSON.stringify(value);
      window.localStorage.setItem(key, string);
      // console.error(`Failed Saving ${key} to Storage`);
    };
    this.stateGet = (key) => {
      const data = window.localStorage.getItem(key);
      return JSON.parse(data);
    };

    this.currentLocation = window.location;
    this.stateRead = window.localStorage;
    this.temp = [];
  }
}
