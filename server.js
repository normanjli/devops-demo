const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())

const students = [`Adrian`, `Norman`, `Spencer`]

app.get(`/`, (req,res)=>{
  res.send(path.join(__dirname, `/index.html`))
})
const port = process.env.PORT || 5050;

app.listen(port, ()=> console.log(`Server listening on ${port}`))