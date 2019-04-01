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
				res.json({error: error});
				console.log(error);
			} else{
				weatherInfo(response[0],response[1], response[2], function(error,response){
					if(error){
						res.json({error: error});
						console.log(error);
					} else{
						res.json(response);
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
			callback("No se pudo acceder al sitio (Mapbox) - checar conexión a internet");
		} 
		else if (response.statusCode != 200) {
			callback("Faltan credenciales para acceder a las coordenadas (Mapbox) o están incorrectas");
		}
		else if(body.features.length === 0){
			callback("No se encontró la ciudad ingresada");
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
				callback("No se pudo acceder al sitio (DarkSky) - checar conexión a internet");
			}
			else if(response.statusCode != 200) {
				callback("Faltan credenciales para acceder a las coordenadas (DarkSky) o están incorrectas");
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
				callback(undefined,webServerResponse);
			}
	});
}

app.get('*', function(req, res){
    res.send({
        error:'Aquí no hay nada'
    })
})

app.listen(port, function(){
	console.log('up and running port 3000');
});