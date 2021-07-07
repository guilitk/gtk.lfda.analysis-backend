/**
 * @description Routed api's that call repository functions of the Person model
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const { personRepository } = require("../repository/personRepository");
const { Router } = require("express");
const personRouter = new Router();

personRouter.get('/',
    async ({res}) => {
        try {
            const result = await personRepository.getAllPersons();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message:"Unknown error"
            });
        }
    });

personRouter.get("/:id",
    async ({params, res}) => {
        try {
            const result = await personRepository.getPersonById(params.id);
            res.status(200).json(result);
        } catch (error) {
            switch (error.status) {
                case 404:
                    res.status(404).json({
                        message: "Person was not found"
                    });
                    break;
            
                default:
                    res.status(500).json({
                        message: "Unknown error"
                    });
                    break;
            }
        }
    });

personRouter.post("/",
    async ({body, protocol, headers, originalUrl, res, next}) => {
        try {
            const result = await personRepository.createPerson(body);
            result.endpoint = `${protocol}://${headers.host}${originalUrl}${result.person.id}`;
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    });

personRouter.delete("/:id",
    async ({params, res, next}) => {
        try {
            await personRepository.deletePerson(params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });

personRouter.put("/:id",
    async ({params, body, res, next}) => {
        try {
            await personRepository.updatePerson(body, params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    });

module.exports = personRouter;