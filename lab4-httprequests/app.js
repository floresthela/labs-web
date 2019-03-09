const credentials = require('./credentials.js')
const request = require('request')


let cityName = 'Monterrey'
let urlMapBox


const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

// leer de la consola el nombre de la ciudad a checar
readline.question('Ingresa el nombre de la ciudad: ', function(newCity){
		urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${newCity}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`
		getCoordinates(newCity)
		console.log(newCity)
		readline.close()
	}
)


// encontrar las coordenadas de la ciudad con mapbox
function getCoordinates(cityName){
	request.get({url:urlMapBox, json:true }, function(error,response,body) {
		
		if(error || cityName === ""){
			console.log("ocurrió un error " + error)
		} else {
			let longitude = body.features[0].center[0]
			let latitude = body.features[0].center[1]
			//console.log(longitude)
			// console.log(latitude)
			weatherInfo(longitude,latitude)
		}
	})
}

// sacar los datos a mostrar con darksky
function weatherInfo(long, lat){
	let urlDarkSky = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?units=si&lang=es`
	//console.log(urlDarkSky)
	request.get({ url: urlDarkSky, json: true }, function(error, response, body) {
			if(error){
				console.log("ocurrió un error " + error)
			}
			let temp = body.currently.temperature
			let precipitationProb = body.currently.precipProbability
			let day = body.currently.summary

			let dayResponse = `${day}. Actualmente esta a ${temp} °C. Hay ${precipitationProb}% de probabilidad de lluvia.`
			console.log(dayResponse)

	})
}


