export default (app, route) => {
    app.get('/', (req, res) => {
        res.send('helloworld')
    })

    app.post('/user', (req, res) => {
        //localhost:3000/user method post
        /*{
            name:'something',
            surname:'something'
          }*/
        const { name, surname } = req.body;
        console.log(name)
        res.send({ hello: name })

    })
}
