const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "김배승쓰",
        description: "주특기 과제",
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);