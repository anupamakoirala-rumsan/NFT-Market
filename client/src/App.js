
import React from"react";
import {Route,Link,BrowserRouter, Switch} from "react-router-dom";
import Explore from "./component/Explore";
import Home from "./component/Home";

// import "bootstrap/dist/css/bootstrap.min.css";
 import "./App.css";
function App(){

  return(
    <BrowserRouter>
    <Switch>
        <Route path="/" exact >

   <Home/>
   </Route>
   <Route path ='/explore' exact>
    <Explore/>
    </Route>
    </Switch>
    </BrowserRouter>

  )
}
export default App;