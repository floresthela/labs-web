// WEATHER APP
const credentials = require('./credentials.js');
const request = require('request');
const express = require('express');
const app = express();

let urlMapBox;

const port = 3000;

app.get('/weather', function(req,res){
	res.setHeader('Access-Control-Allow-Origin','*');
	if(!req.query.search){
		res.json({error:'No se especificó una ciudad'});
	} else{
		var city_ws = req.query.search;
		getCoordinates(city_ws, function(error, response){
			if(error){
				res.send(error);
				console.log(error);
			} else{
				weatherInfo(response[0],response[1], response[2], function(error,response){
					if(error){
						res.send(error);
						console.log(error);
					} else{
						res.send(response);
					}
				});
			}
		});
	}
})

// encontrar las coordenadas de la ciudad con mapbox
function getCoordinates(cityName, callback){
	urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${credentials.MAPBOX_TOKEN}&limit=1`;
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
			
			let city = (body.features[0].place_name);
			let longitude = body.features[0].center[0];
			let latitude = body.features[0].center[1];
			//weatherInfo(longitude,latitude, callback);
			callback(undefined,[longitude,latitude,city]);
		}
	});
}

// sacar los datos a mostrar con darksky
function weatherInfo(long, lat, city, callback){
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
				let webServerResponse = {
					location: city,
					weather: dayResponse
				};
				callback(webServerResponse);
			}
	});
}

app.listen(port, function(){
	console.log('up and running port 3000');
});