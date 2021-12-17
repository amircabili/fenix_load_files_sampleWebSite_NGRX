const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
 
 
const PORT = 4002
const app = express()

const filesApi = require('./controllers/api')

// require('./configs/database');

app.use(cors( ))

app.use(bodyParser.json( ))

 app.use('/api',filesApi)
 
app.get('/', function(req, res){
    res.send('Hello from server Yes!!')
})

app.listen(PORT, function(){
    console.log('Server running on localhost!:' + PORT)
})

