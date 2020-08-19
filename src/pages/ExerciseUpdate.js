import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from 'react-router-dom';

function ExerciseUpdate(){
  const [exercise, setExercise] = useState()
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState("")

  let {ID} = useParams();

  useEffect(()=>{
    async function fetchExercise() {
      setExercise(
        await fetch(`http://localhost:5000/exercises/${ID}`)
        .then( response => response.json()).catch(err => console.log(err, "Fetch Warning!"))
      )
    }
    async function fetchUsers() {
      setUsers(
        await fetch('http://localhost:5000/users')
        .then( response => response.json()).catch(err => console.log(err, "Fetch Warning!"))
      )
    }
    fetchExercise();
    fetchUsers();
  },[ID])

  useEffect(()=>{
    if(exercise) {
      setUsername(exercise.username)
      setDescription(exercise.description)
      setDuration(exercise.duration)
      setDate(exercise.date)
    }
  },[exercise])

  function handleChange(e) {
    e.preventDefault()
    if(e.target.name === 'username') {
      setUsername(e.target.value)
    } else if(e.target.name === 'description') {
      setDescription(e.target.value)
    } else if(e.target.name === 'duration') {
      setDuration(e.target.value)
    } else if(e.target.name === 'date') {
      setDate(e.target.value)
    }
  }
  function handleSubmit(e, data) {
    e.preventDefault();
    console.log(JSON.stringify(data))
    fetch(`http://localhost:5000/exercises/${ID}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)

    }).then(response => {
      if(response.status === 200) {
        window.location.href = '/';
      }
    })
    .catch(error => console.log(`Error: ${error}`))
    // window.location.href = '/'
  }

  return (
    <div className='container'>
      <h2>Update Exercise </h2>
      <form id='update-form' className='form-control' onSubmit={(e, data) => handleSubmit(e, {username: username, description: description, duration: duration, date:date})}>
        <div className='form-group'>
          <label>Enter Username</label>
          <select className='form-control' value={username} name="username" onChange={handleChange} form='update-form'>
            {users && users.map((items,i) => {
              return (
                  <option key={i} value={items.username}>{items.username}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Enter Description</label>
          <input onChange={handleChange} className='form-control' type='text' value={description} name='description'></input><br />
        </div>
        <div className='form-group'>
          <label>Enter Duration</label>
          <input onChange={handleChange} className='form-control' type='number' value={duration} name='duration'></input><br />
        </div>
        <div className='form-group'>
          <label>Enter Date</label>
          <input onChange={handleChange} className='form-control' type='text' value={date} name='date'></input><br />
        </div>
        <button type='submit'> Submit </button>
      </form>
    </div>
  )
}

export default ExerciseUpdate;
