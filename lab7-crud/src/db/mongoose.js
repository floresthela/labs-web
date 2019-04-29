const mongoose = require('mongoose')

const connectionURL = ''


mongoose.connect(connectionURL, {
	useNewUrlParser : true,
	useCreateIndex: true
})


