import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function ExerciseDetail(){
  const [exercise, setExercise] = useState({})

  var {ID} = useParams();

  useEffect(()=>{
    async function fetchExercise() {
      console.log(`http://localhost:5000/exercises/${ID}`)
      setExercise(
        await fetch(`http://localhost:5000/exercises/${ID}`)
        .then( response => response.json()).catch(err => console.log(err, "Fetch Warning!"))
      )
    }
    fetchExercise();
  },[ID])

  return (
    <div className='container'>
      <h2> Exercise Details </h2>
      <div className='container-fluid'>
        { exercise ? (
          <div>
            <div> <h6> Name: {exercise.username} </h6></div>
            <div> <p> {exercise.description} </p></div>
            <div> <h6> Duration: {exercise.duration} </h6></div>
            <div> <h6> Date: {exercise.date} </h6></div>
          </div>
        ) : (<div> Exercise does not exist </div>)}
      </div>
    </div>
  )
}

export default ExerciseDetail;
