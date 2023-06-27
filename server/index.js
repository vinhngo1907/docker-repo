const keys = require("./keys");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser());
app.use(cors());

// Posgres client setup
const {Pool} =require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});

pgClient.on("connect", (client)=>{
    client
    .query("CREATE TABLE IF NOT EXIST values (number INT)")
    .catch((err)=>console.log(err));
})

// Redis client setup
const redis = require("redis");
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express routes handler
app.listen(5000, (err) => {
    console.log("Listening");
})