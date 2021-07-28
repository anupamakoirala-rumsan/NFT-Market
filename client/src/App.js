
import React, { useEffect, useState } from"react";
import {Route,Link,BrowserRouter, Switch} from "react-router-dom";
import Explore from "./component/Explore";
import Home from "./component/Home";
import Details from "./component/Details";
import User from "./component/User";
import getWeb3 from "./getWeb3";
import Token from "./contracts/Token.json";
import Tokenmarket from "./contracts/Tokenmarket.json";
// import "bootstrap/dist/css/bootstrap.min.css";
 import "./App.css";
function App(){
  const[currentAccount,setCurrentAccount]= useState('');
  const[firstcontract,setFirstContract] = useState({});
  const[secondcontract,setSecondContract] = useState({});


  const getweb3data = async()=>{
    const web3 = await getWeb3();
    //get the address from metamask
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    
    //get the networkid 
    const networkid = await web3.eth.net.getId();
    console.log(networkid);

    const networkdeployed = Token.networks[networkid];
   
    //get the instance of first contract
    const firstinstance = await new  web3.eth.Contract(Token.abi,networkdeployed&& networkdeployed.address);
    console.log(firstinstance);

    //get the instance of second contract
    const secondinstance = await new web3.eth.Contract(Tokenmarket.abi, networkdeployed && networkdeployed.address);
    console.log(secondinstance);

    //set the first contract
    setFirstContract({...firstinstance});

    //set the second contract 
    setSecondContract({...secondinstance});

    //set the currentAccount 
    setCurrentAccount(accounts[0]);
    //list the tokens owned by the owner
    let tokens = [];
    tokens = await firstinstance.methods.tokensofOwner(accounts[0]).call();
    console.log(tokens);


  }
  useEffect(()=>{
    getweb3data();
  },[]);

  return(
    <BrowserRouter>
    <Switch>
        <Route path="/" exact >

   <Home 
   currentAccount ={currentAccount}/>
   </Route>
   <Route path ='/explore' exact>
    <Explore 
    currentAccount ={currentAccount}/>
    </Route>
    <Route path ="/details" exact>
      <Details 
      currentAccount ={currentAccount}/>
    </Route>
    <Route path ="/user" >
      <User 
      currentAccount ={currentAccount}/>
    </Route>
    </Switch>
    </BrowserRouter>

  )
}
export default App;