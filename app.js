const express = require('express')
const axios = require('axios')
const app = express()

var router = express.Router();


const cakes = []

router.get('/', function (req, res) {
  res.send(cakes)
})

router.post('/p', async (req, res) => {
  try {
    console.log(req, req.body)
    const { name, price, flavors } = req.payload
    res.send(req.body)
  } catch(error) {
    console.log('Error', error)
    res.status(500).send('Internal server error')
  }
})
 

module.exports = app
