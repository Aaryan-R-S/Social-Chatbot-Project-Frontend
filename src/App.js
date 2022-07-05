import { Fragment, React } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import NavBar from './components/NavBar/NavBar.js';
import HomePage from './components/HomePage/HomePage.js';
import Terms from './components/References/Terms/Terms.js'
import Policy from './components/References/Policy/Policy.js'
import Diet from './components/Recommender/Diet/Diet.js';
import Exercise from './components/Recommender/Exercise/Exercise.js';
import ScrollToTop from './ScrollToTop.js';
// import Chat from './components/Chatbot/Chatbox/Chat.js';
// import TextMain from './components/Resources/Text/TextMain/TextMain.js';
// import VideosMain from './components/Resources/VideosMain/VideosMain.js';
// import Admin from './components/Admin/Admin.js';
// import Audio from './components/Resources/Audio/Audio.js';

// Responsiveness
// Authtoken

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Fragment>
          <ScrollToTop/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route exact path='/terms'>
              <Terms/>
            </Route>
            <Route exact path='/policy'>
              <Policy/>
            </Route>
            {/* <Route exact path='/admin'>
              <Admin/>
            </Route>
            <Route exact path='/admin'>
              <Admin/>
            </Route> */}
            {/* <Route exact path='/chatbot' >
              <Chat/>
            </Route> */}
            {/* <Route exact path='/text'>
              <TextMain/>
            </Route>
            <Route exact path='/video'>
              <VideosMain/>
            </Route> */}
            <Route exact path='/diet'>
              <Diet/>
            </Route>
            <Route exact path='/exercise'>
              <Exercise/>
            </Route>
          </Switch>
        </Fragment>
      </Router>
    </>
  );
}

export default App;
