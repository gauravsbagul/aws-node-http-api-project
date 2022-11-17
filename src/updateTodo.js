"use strict";
const { v4 } = require('uuid')
const AWS = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')

const updateTodo = async (e) => {

    const db = new AWS.DynamoDB.DocumentClient()

    const { completed } = e.body
    const { id } = e.pathParameters
    console.log('Log: ~> file: updateTodo.js ~> line 11 ~> updateTodo ~> id', id)

    await db.update({
        TableName: 'TodoTable',
        Key: { id },
        UpdateExpression: `set completed = :completed`,
        ExpressionAttributeValues: {
            ":completed": completed
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: 'TODO updated',
    };
};

module.exports = {
  handler: middy(updateTodo).use(httpJsonBodyParser())
}