const workoutdetails = ({ workout }) => {
    return (
        <div className="workout_details">
            <h2>{workout.title}</h2>
            <p><strong>Load: {workout.load}kg</strong></p>
            <p><strong>Reps: {workout.reps}</strong></p>
            <p>Created@: {workout.createdAt}</p>
        </div>
    );
}

export default workoutdetails;