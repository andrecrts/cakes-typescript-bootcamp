var express = require('express');
var router = express.Router();

let cakes = []

router.get('/', function (req, res) {
  res.send(cakes)
})

router.get('/:id', function (req, res) {
  try {
    const { params: { id} } = req
    const target = cakes.find(cake => cake.name === id)
    if(target)
      res.send(target)
    else 
      res.status(300).send('Not found')
  } catch(error) {
    res.status(500).send('Internal server error')
  }
})

router.put('/:id', function (req, res) {
  try {
    const { params: { id} } = req
    const { body: { price, flavors } } = req
    const target = cakes.find(cake => cake.name === id)
    if(target) {
      cakes = cakes.filter(cake => cake.name !== id)
      const newCake = {name: id, price, flavors}
      cakes.push(newCake)
      res.send(newCake)
    } else 
      res.status(300).send('Not found')
  } catch(error) {
    res.status(500).send('Internal server error')
  }
})

router.post('', async (req, res) => {
  try {
    const { body: { name, price, flavors } }  = req
    cakes.push({ name, price, flavors})
    res.status(200).json(req.body)
  } catch(error) {
    res.status(500).send('Internal server error')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { params: { id} } = req
    cakes = cakes.filter(cake => cake.name !== id)
    res.send('Borrado')

  } catch(error) {
    res.status(500).send('Internal server error')
  }
})
 

module.exports = router
