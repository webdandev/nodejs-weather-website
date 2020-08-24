const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=9b27b6dd65c46d1c3945c88e1597682e&query=' +
  longitude + ',' + latitude + '&units=m'
  
  request( {url, json:true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +
        body.current.temperature + ' degress out. it feels like ' +
        body.current.feelslike + ' degress out. The humidity is ' + 
        body.current.humidity + ' percent.')
    }
  })
}


module.exports = forecast