import passport from 'passport'
import { signup, getdetail, signin } from '../controller/authenController'
import passportService from '../utils/passport'

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })
export default (app) => {

	app.post('/authentication/signup', signup)
	app.post('/authentication/signin',requireSignin, signin)
	app.get('/authentication/getdetail',requireAuth, getdetail)
}