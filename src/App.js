import { React } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

// import Chat from './components/Chatbot/Chatbox/Chat.js';
import HomePage from './components/HomePage/HomePage.js';
// import NavBar from './components/NavBar/NavBar.js';
// import Diet from './components/Recommender/Diet/Diet.js';
// import Exercise from './components/Recommender/Exercise/Exercise.js';
// import TextMain from './components/Resources/Text/TextMain/TextMain.js';
// import VideosMain from './components/Resources/VideosMain/VideosMain.js';
// import Admin from './components/Admin/Admin.js';
// import Terms from './components/References/Terms/Terms.js'
// import Policy from './components/References/Policy/Policy.js'
// import Audio from './components/Resources/Audio/Audio.js';

function App() {
  return (
    <>
      <Router>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path='/' >
            <HomePage/>          
          </Route>
          {/* <Route exact path='/chatbot' >
            <Chat/>
          </Route> */}
          {/* <Route exact path='/text'>
            <TextMain/>
          </Route>
          <Route exact path='/video'>
            <VideosMain/>
          </Route>
          <Route exact path='/diet'>
            <Diet/>
          </Route>
          <Route exact path='/exercise'>
            <Exercise/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
          </Route>
          <Route exact path='/admin'>
            <Admin/>
          </Route>
          <Route exact path='/policy'>
            <Policy/>
          </Route>
          <Route exact path='/term'>
            <Terms/>
          </Route> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
