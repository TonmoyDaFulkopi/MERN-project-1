import { useEffect, useState } from "react";

//Components
import Workoutdetails from "../components/workoutdetails";

const Home = () => {

    /*
    useState is a hook in React that allows 
    you to have state variables in functional components.
    */
    const [workouts, setWorkouts] = useState(null);

    /*
    useEffect is a hook in React that allows you to perform side effects in
     function components. Side effects
     can include data fetching, subscriptions, or manually changing the DOM.
    */

    useEffect(() => {
        const fetchWorkouts = async () => {
            // its static to React app, so we can use relative path
            // so the fetch will be proxy/api/workouts 
            const res = await fetch("/api/workouts");
            const data = await res.json();

            if (res.ok) {
                setWorkouts(data);
            }
        };
        fetchWorkouts();

        document.title = "Home | Workout Buddy";
    }, []);



    return (
        <div className="home">
            <div className="workouts">
                {/* It will only work if workouts got value */}
                {workouts && workouts.map((workout) => (
                    <Workoutdetails key={workout.id} workout={workout} />
                ))}
            </div>
        </div>
    );
}

export default Home;