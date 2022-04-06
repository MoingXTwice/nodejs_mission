const swaggerAutogen = require("swagger-autogen")({ language: 'ko' });

const doc = {
    info: {
        title: "개인 주특기 과제",
        description: "31일 21시까지 제출해야합니다.",
        tags: [
            {
                name: "User",
                description: "회원 기능"
            },
            {
                name: "Post",
                description: "글 작성 기능"
            },
            {
                name: "Comment",
                description: "댓글 기능"
            }
        ],
        definitions: {
            "Post": {
                "properties": {
                    "postId": {
                        "type": "Number",
                        "required": true,
                        "unique": true
                    },
                    "title": {
                        "type": "String"
                    },
                    "content": {
                        "type": "String",
                        "required": true
                    },
                    "userId": {
                        "type": "Number",
                        "required": true
                    },
                    "nickname": {
                        "type": "String",
                        "required": true
                    },
                    "writeDate": {
                        "type": "String"
                    }
                }
            },
        }
    },
    host: "localhost:3000",
    schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
    "./app.js"
];

swaggerAutogen(outputFile, endpointsFiles, doc);