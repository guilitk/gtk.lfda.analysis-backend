/**
 * @description Repository of functions that interact with the database and perform CRUD operations for the Person model
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const mysql = require("mysql");
const Person = require("../model/person");

function getConnection() {
    const CONNECTION_SETTINGS = Object.freeze({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    });

    return mysql.createConnection(CONNECTION_SETTINGS);
}

function executeQuery(query, values) {
    return new Promise((resolve, reject) => {
        const connection = getConnection();
        connection.connect();
        connection.query(query, values,
            (err, data) => {
                (err) ? reject(err) : resolve(JSON.stringify(data))
            });
        connection.end();
    });
}

async function getAllPersons() {
    const query = "SELECT * FROM person";
    const result = await executeQuery(query);

    return Person.sanitizePersons(JSON.parse(result));
}

async function getPersonById(id) {
    const query = "SELECT * FROM person WHERE id = ?";
    let result = await executeQuery(query, id);
    result = JSON.parse(result);

    if (result.length === 0) {
        throw {status : 404};
    }

    return Person.sanitizePerson(result);
}

async function createPerson(data) {
    const person = new Person(data);
    const query = "INSERT INTO person SET ?";
    const result = await executeQuery(query, person);
    const newPersonId = JSON.parse(result).insertId;

    return await getPersonById(newPersonId);
}

async function deletePerson(id) {
    const query = "DELETE FROM person WHERE id = ?";
    let result = await executeQuery(query, id);
    result = JSON.parse(result)

    if (result.affectedRows < 1) {
        throw new Error(`Person with id ${id} was not deleted`);
    } else {
        return result;
    }
}

async function updatePerson(data, id) {
    const person = new Person(data);
    const query = "UPDATE person SET ? WHERE id = ?";
    let result = await executeQuery(query, [person, id]);
    result = JSON.parse(result)

    if (result.affectedRows < 1) throw new Error(`Person with id ${id} was not updated`);
}

exports.personRepository = {
    getAllPersons: getAllPersons,
    getPersonById: getPersonById,
    createPerson: createPerson,
    deletePerson: deletePerson,
    updatePerson: updatePerson
};