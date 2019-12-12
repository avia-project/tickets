import axios from 'axios';
import config from '../config/apiConfig';

/*
 * /countries - array of countries
 * /cities - array of cities
 * /prices/cheap - array
 */
class Api {
  constructor(config) {
    /*get link API from file apiConfig*/
    this.url = config.url;
    this.weatherUrl = config.weatherUrl;
    this.weatherKey = config.weatherKey;
  }
  async countries() {
    try {
      /*get response from file apiConfig about available countries*/
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async cities() {
    try {
      /*get response from file apiConfig about available cities*/
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async airlines() {
    try {
      /*get response from file apiConfig about available airlines*/
      const response = await axios.get(`${this.url}/airlines`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
  async forecast(params) {
    try {
      const response = await axios.get(`${this.weatherUrl}/forecast/daily`, {
        params,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
