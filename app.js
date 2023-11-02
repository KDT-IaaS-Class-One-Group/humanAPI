const http = require('http')
const express = require('express')
const app = express()
const fs = require('fs');
const port = 3217;

app.use(express.static("static"));
// server
app.get('/', (req, res) =>{
  fs.readFile('')
})



serv.listen(port, () => {
  console.log(`
http://localhost:${port}
  `)
})