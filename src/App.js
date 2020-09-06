import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Result from './pages/Result';

function App() {
  const [expeditions, setExpeditions] = useState([]);
  const [expeditionResult, setExpeditionResult] = useState(null);

  const onSelectExpedition = (planet, vehicle) => {
    setExpeditions([
      ...expeditions,
      {
        planet: planet.name,
        vehicle: vehicle.name,
        distance: planet.distance,
        speed: vehicle.speed,
      },
    ]);
  };

  const onDeleteExpedition = (planet) => {
    if (planet === 'all') {
      setExpeditions([]);
    } else {
      setExpeditions(expeditions.filter((t) => t.planet !== planet));
    }
  };

  const onReset = () => {
    setExpeditions([]);
  };

  return (
    <Router>
      <div className="container-fluid">
        <Header
          title="Finding Falcone!"
          onReset={onReset}
          expeditionsCount={expeditions.length}
        ></Header>
        <Switch>
          <Route path="/" exact>
            <Home
              expeditions={expeditions}
              onSelectExpedition={onSelectExpedition}
              onDeleteExpedition={onDeleteExpedition}
              setResult={setExpeditionResult}
              setExpeditions={setExpeditions}
            />
          </Route>
          <Route exact path="/result">
            <Result result={expeditionResult} setResult={setExpeditionResult} />
          </Route>
          <Redirect path="*" to="/"></Redirect>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
