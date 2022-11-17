"use strict";
const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')


const addTodo = async (e) => {

  const db = new AWS.DynamoDB.DocumentClient()

  const { todo } = e.body
  console.log('Log: ~> file: addTodo.js ~> line 7 ~> addTodo ~> todo', todo)

  const createdAt = new Date().toISOString()
  const id = v4()

  const newTodo = {
    id,
    createdAt,
    todo,
    completed: false
  }

  const res = await db.put({
    TableName: 'TodoTable',
    Item: newTodo
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: middy(addTodo).use(httpJsonBodyParser())
}