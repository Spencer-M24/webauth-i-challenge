
module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './db/dev.sqlite3'
      },
      useNullAsDefault:true,
      seeds: {
              directory: './database/seeds'
      },
  
    migrations: {
      directory: './database/migrations'
    }
  }
  }; 
  