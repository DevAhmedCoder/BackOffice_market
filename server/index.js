const express = require('express');
const app = express();
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// Routes
var indexRouter= require('./src/routes/route');
app.use('/',indexRouter);

// Port 5000
app.listen(5000, () => {
    console.log("server has started on port 5000");
});