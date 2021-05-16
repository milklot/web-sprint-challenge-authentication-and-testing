  
const db = require("../../data/dbConfig");

function getUserById(id) {
  return db('users')
  .where({id})
  .first()
} 

function getUserByUsername(username) {
  return db('users')
    .where({username})
    .first()
}

function addUser(body) {
  return db('users')
    .insert(body)
    .then(id => {
      return getUserById(id)
    })
}

module.exports = {
	getUserByUsername,
	addUser,
	getUserById
  }