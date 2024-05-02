const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

// import the DB model
const Workout = require('../models/workoutModel');
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');


// middleware



// routes

// get all workouts
router.get('/', getWorkouts);

// get one workout
router.get('/:id', getWorkout);

//! SHOWS ERROR WITHOUT bodyParser.json() !!


router.post('/', bodyParser.json(), createWorkout);
/**
router.post('/', bodyParser.json(), async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const newWorkout = await Workout.create({ title, reps, load });
        res.status(200).json(newWorkout);
    } catch (error) {
        res.status(400).json({ message: 'error creating workout' });
    }
});
*/

// delete a workout
router.delete('/:id', deleteWorkout);

// update a workout
router.patch('/:id', updateWorkout);

// export the router

module.exports = router;