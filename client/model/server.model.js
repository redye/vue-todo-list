const config = require('../../app.config')
const createDb = require('../../server/db/db')

const db = createDb(config.appId, config.appKey)

export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
