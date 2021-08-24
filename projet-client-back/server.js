const express = require('express')
const app = express()
const cowalk = require('./route.json')

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.get('/cowalk', (req,res)=>{
    res.status(200).json(cowalk)
})

app.post('/cowalk',(req,res)=>{
    
})

app.listen(8080,()=>console.log('connected'))