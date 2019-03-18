// WEATHER APP
const credentials = require('./credentials.js');
const request = require('request');

let urlMapBox;


const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

// leer de la consola el nombre de la ciudad a checar
readline.question('Ingresa el nombre de la ciudad: ', function(newCity){
		if(newCity === ""){
			console.log("No se ingresó ninguna ciudad... Ciudad por default: Monterrey");
			newCity = "Monterrey";
		}
		urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${newCity}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`;
		//console.log(urlMapBox)
		getCoordinates(newCity, function(error, response) {
			if(error) {
				console.log(error);
			}
		});
		readline.close();
	}
)


// encontrar las coordenadas de la ciudad con mapbox
function getCoordinates(cityName, callback){
	request.get({url:urlMapBox, json:true }, function(error,response,body) {
		if(error){
			callback("ERROR para acceder al sitio (MapBox) - checar conexión a internet");
		} 
		else if (response.statusCode != 200) {
			callback("ERROR en las credenciales para acceder a las coordenadas (MapBox)");
		}
		else if(body.features.length === 0){
			callback("ERROR en la ciudad ingresada, no fue encontrada");
		}
		else {
			console.log(body.features[0].place_name);
			let longitude = body.features[0].center[0];
			let latitude = body.features[0].center[1];
			weatherInfo(longitude,latitude, callback);
		}
	});
}

// sacar los datos a mostrar con darksky
function weatherInfo(long, lat, callback){
	let urlDarkSky = `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${lat},${long}?units=si&lang=es`;
	//console.log(urlDarkSky)
	request.get({ url: urlDarkSky, json: true }, function(error, response, body) {
			if(error){
				callback("ERROR para acceder al sitio (DarkSky) - checar conexión a internet");
			}
			else if(response.statusCode != 200) {
				callback("ERROR en las credenciales para acceder a los datos del clima (DarkSky)");
			}
			else{
				let temp = body.currently.temperature;
				let precipitationProb = body.currently.precipProbability;
				let day = body.currently.summary;
				let dayResponse = `${day}. Actualmente esta a ${temp} °C. Hay ${precipitationProb}% de probabilidad de lluvia.`;
				console.log(dayResponse);
			}
	});
}


