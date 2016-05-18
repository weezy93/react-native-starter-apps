var _ = require('lodash');
var rootURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=bf1698a78938b727de493831b13e7625';

var kelvinToF = function (kelvin) {
  return Math.round((kelvin - 273.15) * 1.8 + 32) + '˚';
}

module.exports = function (latitude, longitude) {
  var url = `${rootURL}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return {
        city: json.name,
        temperature: kelvinToF(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
