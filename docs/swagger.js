require("dotenv");

const port = process.env.SWAGGER_PORT;

const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "School service APIs", // by default: 'REST API'
    description: "API for school", // by default: ''
    contact: {
      name: "School API",
      email: "mallikarjunkamtam@gmail.com",
    },
  },
  host: port ?? 3001, // by default: 'localhost:3000'
  basePath: "/", // by default: '/'
  schemes: ["http"], // by default: ['http']
  consumes: ["application/json"], // by default: ['application/json']
  produces: ["application/json"], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "Queue CRUD", // Tag name
      description: "Queue related apis", // Tag description
    },
    {
      name: "Health",
      description: "Health Check",
    },
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
};

const outputFile = "./docs/swagger.json";
const endpointsFiles = ["./src/index.ts", "./src/controllers/*.ts"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });
