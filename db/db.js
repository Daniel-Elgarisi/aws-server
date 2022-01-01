const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Project',
    password: '15975300asD',
    port: 5432,
})

client.connect()

module.exports = client