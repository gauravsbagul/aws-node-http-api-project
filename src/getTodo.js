"use strict";
const AWS = require('aws-sdk')

const getTodo = async (e) => {

    const db = new AWS.DynamoDB.DocumentClient()

    const { id } = e.pathParameters

    let todos = []

    try {
        const result = await db.get({ TableName: 'TodoTable', Key: { id } }).promise()
        todos = result.Item
    } catch (error) {
        console.log('Log: ~> file: getTodo.js ~> line 15 ~> getTodo ~> error', error)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(todos),
    };
};

module.exports = {
    handler: getTodo
}