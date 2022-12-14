import { Fragment, React } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import CredState from './context/cred/CredState';
import NavBar from './components/NavBar/NavBar.js';
import HomePage from './components/HomePage/HomePage.js';
import Terms from './components/References/Terms/Terms.js'
import Policy from './components/References/Policy/Policy.js'
import Diet from './components/Recommender/Diet/Diet.js';
import Exercise from './components/Recommender/Exercise/Exercise.js';
import Spiritual from './components/Recommender/Spiritual/Spiritual.js';
import ScrollToTop from './ScrollToTop.js';
import Chat from './components/Chatbot/Chat.js';
import Dashboard from './components/Dashboard/Dashboard.js';
import VideosMain from './components/Videos/VideosMain.js';
import Alert from './components/NavBar/Alert/Alert';

function App() {
  
  return (
    <>
      <CredState>
      <Router>
        <NavBar/>
        <Alert/>
        <Fragment>
          <ScrollToTop/>
          <Switch>
            <Route exact path='/'>
              <HomePage/>
            </Route>
            <Route exact path='/chatbot' >
              <Chat/>
            </Route>
            <Route exact path='/terms'>
              <Terms/>
            </Route>
            <Route exact path='/policy'>
              <Policy/>
            </Route>
            <Route exact path='/videos'>
              <VideosMain/>
            </Route>
            <Route exact path='/diet'>
              <Diet/>
            </Route>
            <Route exact path='/exercise'>
              <Exercise/>
            </Route>
            <Route exact path='/spiritual'>
              <Spiritual/>
            </Route>
            <Route exact path='/dashboard'>
              <Dashboard/>
            </Route>
          </Switch>
        </Fragment>
      </Router>
      </CredState>
    </>
  );
}

export default App;
