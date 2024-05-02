require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

//FROM routes/workouts.js
const workoutRoutes = require('./routes/workouts');


//express app
const app = express();

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//Routes
// instead of app.get we use app.use() and pass in the route and the router

app.use(express.json())

app.use("/api/workouts", workoutRoutes);

//connect to mongodb
//using environment variable for connection string
const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL).then((result) => {
    //listen for requests AFTER connecting to db
    //using environment variable for port
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port ', process.env.PORT);
    });
})
    .catch((err) => console.log(err));

