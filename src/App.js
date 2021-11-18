import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from "./home";
import { Game } from "./game";
import { Error } from "./error";
// import { useGlobalContext } from "./context";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
