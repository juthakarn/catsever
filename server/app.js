import express from 'express'
import bodyParser from 'body-parser'
const path = require('path')
import { findcats, news } from '../models'
import cors from 'cors'
const fs = require('fs')
var multer = require('multer')
import authenticationRoute from './routes/authentication'
import hospitalSevice from './routes/hospitalservice'
import catService from './routes/postcat'
import { async } from 'rxjs/internal/scheduler/async';

const app = express()
const port = 3000





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const Storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, __dirname+'/'+'images/cat')
	},
	filename(req, file, callback) {
		callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
	},
})
const upload = multer({  limits: { fieldSize: 25 * 1024 * 1024 }, storage: Storage })

app.post('/cat',upload.array('photo',3), async (req, res) => {
	const file = req.files[0]
	const body = req.body
	console.log(file)
	console.log(req.body)
	const imagepath = file.filename
	const  result = await findcats.create({
		...body,
		imagepath,
	})
	const allFindCats = await findcats.findAll()
	res.status(200).json({message:'success',allFindCats})
	
})
app.get('/catlist', async(req,res)=>{
	const allFindCats = await findcats.findAll()
	res.status(200).json({message:'success',allFindCats})
})

app.get('/news',async(req,res)=>{
	const newsList = await news.findAll()
	res.status(200).json({message:'success',newsList})
})

/* Router */
authenticationRoute(app)
hospitalSevice(app)
catService(app)
app.use('/',express.static(__dirname+'/'+'images/cat'))
app.listen(port, () => {
	console.log('Sever Listen on port', port)
})
