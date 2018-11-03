const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) 

app.listen(port, () => {
    console.log('Sever Listen on port', port)
})

app.get('/',(req,res)=>{
    res.send('helloworld')
})
app.post('/user',(req,res)=>{
    //localhost:3000/user method post
  /*{
      name:'something',
      surname:'something'
    }*/     
    const {name,surname} = req.body;
    console.log(name)
    res.send({hello:name})

})