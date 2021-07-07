/**
 * @description Configuration to produce the Swagger documentation of the API with the package swagger-ui-express.
 *              This configuration conforms with the OpenAPI Specification - https://github.com/OAI/OpenAPI-Specification.
 * 
 * @author Guilherme Tomazi Klein
 */

"use strict";

const packageInfo = require("../package.json");

module.exports = {
    openapi: "3.0.3",
    info: {
        title: packageInfo.name,
        version: packageInfo.version
    },
    servers: [
        {
            url: `http://${process.env.HOST}:${process.env.PORT}${process.env.API_PATH}`
        }
    ],
    paths: {
        '/': {
            get: {
                tags: ["Person API"],
                description: "Get all the persons",
                responses: {
                    200: {
                        description: "Persons were obtained",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Persons"
                                }
                            }
                        }
                    },
                    500: {
                        description: "Unknown error occurred",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        },
        '/{id}': {
            get: {
                tags: ["Person API"],
                description: "Get a person",
                parameters: [
                    {
                      name: "id",
                      in: "path",
                      description: "ID of the person that one wants to retrieve",
                      required: true,
                      schema: {
                        $ref: "#/components/schemas/id"
                      }
                    }
                  ],
                responses: {
                    200: {
                        description: "Person was obtained",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/Person"
                                }
                            }
                        }
                    },
                    404: {
                        description: "Person was not found",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse",
                                }
                            }
                        }
                    },
                    500: {
                        description: "Unknown error occurred",
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: "#/components/schemas/ErrorResponse"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            id: {
                type: "integer",
                description: "Unique identifier of the person",
                example: 1234
            },
            name: {
                type: "string",
                description: "Name of the person",
                example: "John Doe"
            },
            email: {
                type: "string",
                description: "E-mail of the person",
                example: "john_doe@foo.com"
            },
            dateOfBirth: {
                type: "string",
                description: "Birth date of the person",
                example: "1984-07-13"
            },
            Person: {
                type: "object",
                properties: {
                    id: {
                        $ref: "#/components/schemas/id"
                    },
                    name: {
                        $ref: "#/components/schemas/name"
                    },
                    email: {
                        $ref: "#/components/schemas/email"
                    },
                    dateOfBirth: {
                        $ref: "#/components/schemas/dateOfBirth"
                    }
                }
            },
            Persons: {
                properties: {
                    persons: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/Person"
                        }
                    }
                }
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Message describing the error occurred",
                        example: "Description of the error"
                    }
                }
            }
        }
    },
    tags: {
        name: "Person API",
        description: "API's to perform CRUD operations on the Person model"
    }
}