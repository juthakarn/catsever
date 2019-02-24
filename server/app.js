import express from 'express'
import bodyParser from 'body-parser'
import authenticationRoute from './routes/authentication'
import hospitalSevice from './routes/hospitalservice'


const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


/* Router */
authenticationRoute(app)
hospitalSevice(app)

app.listen(port, () => {
	console.log('Sever Listen on port', port)
})
