// All Logic for the workout routes will be here
// ALL the FUNCTIONS for the routes will be here
const Workout = require('../models/workoutModel');

const mongoose = require('mongoose');

const express = require('express');

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

//* not using this
// const router = express.Router();

// get workouts
const getWorkouts = async (req, res) => {
    try {
        //* find all workouts and sort by createdAt descending
        const workouts = await Workout.find({}).sort({
            createdAt: -1
        });
        //! ALWAYS RETURN A RESPONSE otherwise 
        //! 'ERR_HTTP_HEADERS_SENT' 
        return res.status(200).json(workouts);
    } catch (error) {
        return res.status(400).json({ message: 'error getting workouts' });
    }
}

// get one workout
const getWorkout = async (req, res) => {

    //* get the /:id from the params
    const { id } = req.params;

    //* check if the id is valid Cz theres chance of crashing the server
    // if (!mongoose.ObjectID.isValid(id)) {
    //     return res.status(404).send('No workout with that id');
    // }

    if (!objectIdRegex.test(id)) {
        return res.status(404).send('No workout with that id');
    }

    try {
        const workout = await Workout.findById(id);
        return res.status(200).json(workout);
    }
    catch (error) {
        return res.status(400).json({ message: 'error getting workout' });
    }
}

// create a workout 
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const newWorkout = await Workout.create({ title, reps, load });
        return res.status(200).json(newWorkout);
    } catch (error) {
        return res.status(400).json({ message: 'error creating workout' });
    }
}

//! DELETE AND UPDATE REQUIRES ID WHICH FUCKS UP THE SHIT

// delete a workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // if (!mongoose.ObjectID.isValid(id)) {
    //     return res.status(404).send('No workout with that id');
    // }

    if (!objectIdRegex.test(id)) {
        return res.status(404).send('No workout with that id');
    }

    try {
        const workout = await Workout.findByIdAndDelete({ _id: id });
    } catch (error) {
        return res.status(400).json({ message: 'error deleting workout' });
    }

    //! I keeps looping without this shit
    return res.json({ "message": "Workout deleted successfully" });

}


// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // if (!mongoose.ObjectID.isValid(id)) {
    //     return res.status(404).send('No workout with that id');
    // }

    if (!objectIdRegex.test(id)) {
        return res.status(404).send('No workout with that id');
    }

    try {
        const workout = await Workout.findByIdAndUpdate({ _id: id }, req.body);
        return res.status(200).json(workout);
    } catch (error) {
        return res.status(400).json({ message: 'error updating workout' });
    }

    // const workout = await Workout.findByIdAndUpdate({ _id: id }, ...req.body);

    // if (!workout) {
    //     return res.status(404).json({ message: 'No workout with that id' });
    // }

    // return res.json({ "message": "Updated successfully" })
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}