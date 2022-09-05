

import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Dashboard from './components/Dashboard';
import NewPet from './components/NewPet';
import PetDetails from './components/PetDetails';
import Update from './components/Update';


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/new">
        <NewPet />
      </Route>
      <Route exact path="/:petId">
        <PetDetails />
      </Route>
      <Route exact path="/:petId/edit">
        <Update/>
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
