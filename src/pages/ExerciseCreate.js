import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExerciseCreate(){
  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function fetchUsers() {
      setUsers(
        await fetch('http://localhost:5000/users')
        .then( response => response.json()).catch(err => console.log(err, "Fetch Warning!"))
      )
    }
    fetchUsers();
  },[])

  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState((new Date()).toString())

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
    fetch(`http://localhost:5000/exercises/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)

    }).then(response => console.log(response.json()))
    .catch(error => console.log(`Error: ${error}`))
    window.location.href = '/'
  }

  return (
    <div className='container'>
      <form className='form-control' onSubmit={(e, data) => handleSubmit(e, {username: username, description: description, duration: duration, date:date})}>
        <div className='form-group'>
          <label>Select User</label>
          <select className='form-control' value={username} name="username" onChange={handleChange} form='create-form'>
            {users && users.map((items,i) => {
              return (
                  <option key={i} value={items.username}>{items.username}</option>
              )
            })}
          </select>
        </div>
        <div className='form-group'>
          <label>Enter Description</label>
          <input className='form-control' onChange={handleChange} type='text' value={description} name='description'></input><br />
        </div>
        <div className='form-group'>
          <label>Enter Duration</label>
          <input className='form-control' onChange={handleChange} type='number' value={duration} name='duration'></input><br />
        </div>
        <div className='form-group'>
          <label>Enter Date</label>
          <input className='form-control' onChange={handleChange} type='text' value={date} name='date'></input><br />
        </div>
        <button type='submit'> Submit </button>
      </form>
    </div>
  )
}

export default ExerciseCreate;
