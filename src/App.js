import React from 'react';
import StartPage from "./StartPage/Index";
import './App.css';
import {Route, Switch} from "react-router-dom";

function App() {
  return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => <StartPage/>}/>
        </Switch>
      </div>
  );
}

export default App;
