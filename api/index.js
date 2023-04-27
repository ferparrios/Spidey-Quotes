const app = require('express')()
const JsSearch = require('js-search')

const enQuotes = require('./en-quotes.json')
const esQuotes = require('./es-quotes.json')

const searchEn = new JsSearch.Search('quote')
searchEn.addDocuments(enQuotes)
searchEn.addIndex('quote')

const searchEs = new JsSearch.Search('quote')
searchEs.addDocuments(esQuotes)
searchEs.addIndex('quote')

app.get('/api/fer', (req, res) => {
  // res.send({ title: 'Fer' })
  const { query } = req
  res.json({
    name: 'Fer',
    wife: 'Mary'
  })
})

app.get('/api/quotes/en', (req, res) => {
  const { query } = req
  console.log(query.search)
  if (query.search) {
    res.send(searchEn.search(query.search))
  }
  res.send(enQuotes)
})

app.get('/api/quotes/en/:id', (req, res) => {
  const { params } = req
  res.send(enQuotes[params.id])
})

app.get('/api/quotes/es', (req, res) => {
  const { query } = req
  console.log(query.search)
  if (query.search) {
    res.send(searchEs.search(query.search))
  }
  res.send(esQuotes)
})

app.get('/api/quotes/es/:id', (req, res) => {
  const { params } = req
  res.send(esQuotes[params.id])
})

module.exports = app