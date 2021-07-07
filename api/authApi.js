/**
 * @description Api routes for authentication
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const { Router } = require("express");
const authRouter = new Router();

authRouter.post("/login",
    async ({ body, res, next }) => {
        try {
            const { username, password } = body
            //TODO: implement LDAP authentication
            //TODO: implement token generation
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    });

apiRouter.post("/logout",
    async ({ body, res, next }) => {
        try {
            //TODO: implement logout
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    });

module.exports = authRouter;