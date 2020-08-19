import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Switch,  Route} from 'react-router-dom';

import ExerciseList from './pages/ExerciseList';
import ExerciseCreate from './pages/ExerciseCreate';
import ExerciseUpdate from './pages/ExerciseUpdate';
import ExerciseDetail from './pages/ExerciseDetail';
import NoMatch from './pages/NoMatch';

function App() {

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={ExerciseList} />
          <Route exact path='/create' component={ExerciseCreate} />
          <Route exact path='/update/:ID' component={ExerciseUpdate} />
          <Route exact path='/detail/:ID' component={ExerciseDetail} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
