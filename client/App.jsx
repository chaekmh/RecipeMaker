import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import NavBar from './components/NavBar';
import AboutUs from './components/AboutUs';
import './styles.css';

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      {/* <Switch>
        <Route exact path="/signup" component={() => <SignUp/>} />
        <Route exact path="/aboutus" component={() => <AboutUs />} />
        <Route exact path="/" component={() => <MainContainer />} />
      </Switch> */}
      {/* <AboutUs /> */}
      <MainContainer />
    </div>
  );
}

export default App;
