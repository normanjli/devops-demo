const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '80576576c4124f1781b787dfdb1cef7b',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
// rollbar.log("Hello world!");

const students = [`Adrian`, `Norman`, `Spencer`]

app.get(`/`, (req,res)=>{
  res.sendFile(path.join(__dirname, `./index.html`))
})
app.get(`/api/students`,(req,res)=>{
  res.status(200).send(students)
  rollbar.log("Hello world!");
})
app.post(`/api/students`,(req,res)=>{
  students.push(req.body)
  res.status(200).send(students)
})
app.delete(`/api/students/:id`,(req,res)=>{
  res.status(200).send(students)
})
const port = process.env.PORT || 5050;

app.listen(port, ()=> console.log(`Server listening on ${port}`))