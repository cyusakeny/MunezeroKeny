import generateToken from './token'
const express = require('express')
const app = express()
let GivenTokens =[]
let UsedToken = []
let days
app.use(express.json());
app.post("/Buytoken",async(req,res)=>{
    const money = req.body.money
    const meter = req.body.meter
    if (meter.length!=6) {
res.status(400).send("Invalid meter")        
    }
   else if((money%100)!=0||money<100 || money>182500){
        res.status(400).send("Money must be a multiple of 100 between 100 && 182500")
    }
  else{
      const token = generateToken
     days = money/100
      GivenTokens.push(token)
      res.status(200).send(token)
  }
})
app.post("/UseToken",async(req,res)=>{
    const token = req.body.token
    let index = GivenTokens.findIndex(token)
    let ifUsed = UsedToken.findIndex(token) 
    if (index==null) {
        res.status(400).send("Unknown token")
    }
    if (ifUsed!=null) {
        res.status(401).send("Token used")
    }
    else {
        res.status(201).send(days)
        UsedToken.push(token)
    }
})
app.listen(3001,function (){
    console.log(`Server listening on port 3001`)
})