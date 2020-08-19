import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExerciseList(){
  const [exercises, setExercises] = useState([])

  useEffect(()=>{
    async function fetchExercises() {
      setExercises(
        await fetch('http://localhost:5000/exercises')
        .then( response => response.json()).catch(err => console.log(err, "Fetch Warning!"))
      )
    }
    fetchExercises();
  },[])

  function handleDelete(e, id) {
    e.preventDefault();
    console.log(id)
    fetch(`http://localhost:5000/exercises/${id}/delete`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
      'Content-Type': 'application/json; charset=utf-8'
      },
    }).then(response => {
      if(response.status === 200) {
        window.location.href = '/';
      }
    })
    .catch(error => error)
  }

  const handleAction = (e, action, id) => {
    e.preventDefault();
    if(action === 'c') {
      window.action.href = '/create'
    } else if(action === 'r') {
      window.location.href = `/detail/${id}`
    } else if(action === 'u') {
      window.location.href = `/update/${id}`
    }
  }


  console.log(exercises)
  return (
    <div className='container'>
      <h2 className='text-center'> List of Available Exercises </h2>
      <div className='container'>
        <table className='table'>
          <thead>
            <tr className='info'>
              <th>Serial#</th>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises && exercises.map((items, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1} </td>
                  <td> {items.username} </td>
                  <td> {items.description} </td>
                  <td> {items.duration} </td>
                  <td> {items.date} </td>
                  <td>
                    <div className='btn btn-group'>
                      <button onClick={(e,action,id) => handleAction(e, 'r', items._id)} className='btn btn-sm btn-outline-primary'> View </button>
                      <button onClick={(e,action,id) => handleAction(e, 'u', items._id)} className='btn btn-sm btn-outline-success'> Update </button>
                      <button onClick={(e, id) => handleDelete(e, items._id)} className='btn btn-sm btn-outline-danger'> Delete </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='container'>
          <button className='btn btn-block btn-primary' onClick={(e,action) => handleAction(e, 'c')}>
            Create an Exercise
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExerciseList;
