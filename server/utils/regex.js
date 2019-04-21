import { TOKEN_SECRET_KEY } from './constant'

var jwt = require('jsonwebtoken')
export const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export const generateToken = payload => {
	const { id } = payload
	const timestamp = new Date().getTime()
	const token = jwt.sign({ sub: id, iat: timestamp }, TOKEN_SECRET_KEY)
	return token
}

export const degenerateToken = payload => {
	const data = jwt.verify(payload, TOKEN_SECRET_KEY)
	return data
}
