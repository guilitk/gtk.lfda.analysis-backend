/**
 * @description Server configuration
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const app = require("express")();
const { json } = require("express");

const cors = require("./config/cors");
const swaggerUi = require("swagger-ui-express");
const swaggerConfig = require("./api/swagger");
const authRouter = require("./api/authApi");
const PORT = process.env.PORT;

app.use(process.env.API_DOC_PATH, swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(process.env.AUTH_API_PATH, json(), cors, authRouter);

app.listen(PORT);