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
  // rollbar.log("Hello world!");
})
app.post(`/api/students`,(req,res)=>{
  let {name} = req.body
  const index = students.findIndex(student=>{
    return student===name
  })
  try{
    if (index ===-1 && name !== ``){
      students.push(name)
      res.status(200).send(students)
    }else if(name===``){
      res.status(400).send(`enter a student name`)
      rollbar.error(`no student name added`)
    }else{
      res.status(400).send(`student already exists`)
      rollbar.error(`Attempted to add a student that already exists`)
    }
  }catch (err){console.log(err)}

})
app.delete(`/api/students/:id`,(req,res)=>{
  const targetStudent = +req.params.id
  students.splice(targetStudent, 1)
  res.status(200).send(students)
})
app.post(`/api/break`,(req,res)=>{
  const {name} = req.body
  try{
    doesntExist()
  }catch (error){
    rollbar.critical(`jeez ${name}`)
    res.status(400).send(`${name} broke my page`)
  }
})
const port = process.env.PORT || 5050;

app.listen(port, ()=> console.log(`Server listening on ${port}`))