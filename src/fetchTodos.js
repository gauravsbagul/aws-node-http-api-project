"use strict";
const AWS = require('aws-sdk')

const fetchTodos = async (e) => {

  const db = new AWS.DynamoDB.DocumentClient()
  
  let todos = []

  try {
    const result =  await db.scan({TableName:'TodoTable'}).promise()
    todos = result.Items
  } catch(error) {
    console.log('Log: ~> file: fetchTodos.js ~> line 15 ~> fetchTodos ~> error', error)
    
  }
  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: fetchTodos
}