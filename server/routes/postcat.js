import {
	signup, getCurUser, getTakeToken, signin,
} from '../controller/authenController'

export default (app) => {
	app.post('/cat', (req, res) => {
		const {
			latitude,
			lontitude,
			message,
			address,
			contact,
		} = req.body
  })
};
