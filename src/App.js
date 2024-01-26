import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from "./home";
import { Game } from "./game";
import { Error } from "./error";
import { Header, Footer } from "./header-footer";
import { useGlobalContext } from './context';

function App() {
  const { darkMode } = useGlobalContext();
  return (
    <div id="app" className={ darkMode ? 'dark-App' : 'App'}>
      <Router>
        <Header />
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
        <Footer />
      </Router>
    </div>
  );
}


export default App;
