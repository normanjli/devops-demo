const express = require('express')
const app = express()
const path = require('path')
// include and initialize the rollbar library with your access token
app.use(express.json())

const students = [`Adrian`, `Norman`, `Spencer`]
app.get(`/`, (req,res)=>{
  res.send(path.join(__dirname, `/public/index.html`))
})
const port = process.env.PORT || 5050;

app.listen(port, ()=> {console.log(`Server listening on ${port}`)})