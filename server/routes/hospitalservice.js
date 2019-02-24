
export default (app) => {
	app.get('/hospitalserver', ({ res, req }) => {
		res.send('hi')
	})

	app.get('/hospitalserver1', (req, res) => {
		res.send('Ai tong bra')
	})
}
