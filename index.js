const express = require('express')
const cakesRouter = require('./cakesRouter')

const app = express()
 
app.listen(3000)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/cakes', cakesRouter);


module.exports = app
