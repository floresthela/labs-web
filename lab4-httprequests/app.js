const credentials = require('./credentials.js')
const request = require('request')


let cityName = 'Monterrey'

let urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`
getCoordinates(cityName)
console.log(cityName)

function getCoordinates(cityName){
	request.get({url:urlMapBox, json:true }, function(error,response,body) {
		if(error){
			console.log("ocurrió un error" + error)
		}
		//console.log(urlMapBox)
		let longitude = body.features[0].center[0]
		let latitude = body.features[0].center[1]
		//console.log(longitude)
		//console.log(latitude)
		weatherInfo(longitude,latitude)
	})
}

function weatherInfo(long, lat){
	let urlDarkSky = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?units=si&lang=es`
	//console.log(urlDarkSky)
	request.get({ url: urlDarkSky, json: true }, function(error, response, body) {
			if(error){
				console.log("ocurrió un error" + error)
			}
			let temp = body.currently.temperature
			let precipitationProb = body.currently.precipProbability
			let day = body.currently.summary

			let dayResponse = `${day}. Actualmente esta a ${temp} °C. Hay ${precipitationProb}% de probabilidad de lluvia.`
			console.log(dayResponse)

	})
}


