const connection = require('./knexfile')
var knex = require('knex')(connection.development)
var bookshelf = require('bookshelf')(knex)

const Transaction = bookshelf.Model.extend({
  tableName: 'transactions'
})

const express = require('express')

const server = express()
server.use(require('body-parser').json())

server.get('/transaction', async (req, res) => {
  // use ORM
  // const data = await new Transaction()
  //   .query(function (qb) {
  //     // query builder
  //     qb.where('title', '=', 'food')
  //     console.log(qb.toSQL())
  //   })
  //   .fetchAll()
  // const { models } = data
  // res.json(models)

  // direct SQL Statement
  const results = await knex.raw(`SELECT * FROM spend.transactions where title = "${req.query.title || 'food'}"`)
  res.json(results[0])
})

// write data to db
server.post('/transaction', (req, res) => {
  const { body } = req
  const transaction = new Transaction(body)

  transaction.save().then(function () {
    res.send('saved')
  })
})

server.listen(3000, () => {
  console.log('server is started !!')
})
