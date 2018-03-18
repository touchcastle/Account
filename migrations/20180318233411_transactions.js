
exports.up = function (knex, Promise) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').unsigned().primary()
    table.string('title').notNull()
    table.integer('amount')
  })
}

exports.down = function (knex, Promise) {

}
