import Movies from "./components/movies";
import About from "./components/About";
import Home from "./components/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Nav from "./components/Nav";
function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
  <Route path = "/" exact component = {Home}/>
   <Route path = "/movies" component = {Movies}/>
   <Route path='/about' render={(props)=>(
      <About {...props} isAuth={true}/>
    )}/>
   </Switch>
   </Router>
  )
}

export default App;
