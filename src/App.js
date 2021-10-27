import Movies from "./components/movies";
import About from "./components/About";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
function App() {
  return (
    <Router>
      <Switch>
   <Route path = "/movies" component = {Movies}/>
  <Route path = "/about" component = {About}/>
  <Route path = "/" component = {Home}/>
   </Switch>
   </Router>
  )
}

export default App;
