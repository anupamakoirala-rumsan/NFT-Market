import React from "react";
import Nabbar from "./Nav";
import {Card,Row,Col} from "react-bootstrap";
import logo from "../logo.svg";
function Explore(props){
    return(
    <div className="explore">

    <Nabbar
    currentAccount ={props.currentAccount}/>
    <div className="heading">
        <h3>
            All the collectibles available in this contract
        </h3>
    </div>
    <div className="display">
        <Card  className="displaycard">
            <img src={logo}
            height="100"
            width="100"/>
            <label>Name:</label>
            <label>Tokenid:</label>
            <label>Price:50</label>
            < a href ="/details"> Details</a>
            </Card>
            
    </div>
        </div>
        
    )
}
export default Explore;