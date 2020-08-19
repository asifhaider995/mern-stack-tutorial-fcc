const router = require('express').Router();

let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
  .then(exercises => res.json(exercises))
  .catch(error => res.status(400).json('Error: '+error));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({username, description, duration, date});
  newExercise.save()
  .then(() => res.json('Exercise added'))
  .catch(error => {console.log(`Error: ${error}`);res.status(400).json('Error: '+error)});
});

router.route('/:id').get((req, resp) => {
  Exercise.findById(req.params.id)
  .then( exercise => resp.json(exercise))
  .catch(error => {console.log("Error: "+error);resp.status(400).json("Error: "+error)})
})

router.route('/:id/delete').delete((req, resp) => {
  console.log(req.params);
  Exercise.findByIdAndDelete(req.params.id)
  .then( exercise => resp.json("Delete complete"))
  .catch(e => resp.status(400).json("Error: "+e));
})

router.route('/:id/update').post((req, resp) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    exercise.username = req.body.username;
    exercise.description = req.body.description;
    exercise.duration = Number(req.body.duration);
    exercise.date = Date.parse(req.body.date);

    exercise.save()
    .then(() => resp.json("Updated"))
    .catch(e => resp.status(400).json("Error: "+e))
  }).catch(e => resp.status(400).json("Error: "+e))
})

module.exports = router;
