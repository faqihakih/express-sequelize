const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const route = require('./route/route');
const { urlencoded } = require('express');


app.listen( port, () => {
    console.log("run express");
})

app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(express.json({}))
route(app);