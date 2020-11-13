const request = require('supertest')
const cakesRouter = require('../cakesRouter')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/cakes', cakesRouter);



describe('GET /cakes', function() {
  it('responds with list of cakes', function(done) {
    request(app)
      .get('/cakes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([])
        done()
      })
  });
})

describe('POST /cakes', () => {
  const data = {
    name: 'chocolate',
    price: 15.25,
    flavors: ['chocolate']
  }

  it('add Cake', function(done) {
    request(app)
      .post('/cakes')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(data)
        done()
      })
      .catch(done)
  });
  
  it('get all cakes', function(done) {
    request(app)
      .get('/cakes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([data])
        done()
      })
  });
});

describe('GET single /cakes', function() {
  const data = {
    name: 'chocolate',
    price: 15.25,
    flavors: ['chocolate']
  }

  it('responds with single cake', function(done) {
    request(app)
      .get(`/cakes/${data.name}`)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(data)
        done()
      })
  });
})

describe('PUT /cakes', () => {

  const data = {
    name: 'chocolate',
    price: 16.25,
    flavors: ['chocolate']
  }
  
  it('edit Cake', function(done) {

    request(app)
      .put(`/cakes/${data.name}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(response => {
        expect(response.body).toEqual(data)
        done()
      })
      .catch(done)
  });
  
  it('get all cakes', function(done) {
    request(app)
      .get('/cakes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([data])
        done()
      })
  });
});

describe('DELETe /cakes', () => {

  const data = {
    name: 'chocolate',
    price: 16.25,
    flavors: ['chocolate']
  }
  
  it('delete Cake', function(done) {

    request(app)
      .delete(`/cakes/${data.name}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.text).toEqual('Borrado')
        done()
      })
      .catch(done)
  });
  
  it('get all cakes', function(done) {
    request(app)
      .get('/cakes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual([])
        done()
      })
  });
});
