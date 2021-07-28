import React, { useState } from "react";
import Nabbar from "./Nav";
import {Button, Card, Form,Collapse} from "react-bootstrap";
import logo from "../logo.svg";


function User(props){
const[loading,setLoading] = useState(false);
    return(
        <div className="userpage">
        <Nabbar
        currentAccount ={props.currentAccount}/>
        <div className="heading">
        <h3>Collectibles owned by you</h3>
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
            <Button onClick ={(event)=>
                setLoading(!loading)//token ko state sanga check garnae tala loading pathako thau ma pathuanae 
                }
                aria-controls ="example-collapse-text"
                aria-expanded={loading}> List for sell</Button>
                <br/>
                <Collapse in={loading}>
                    <div id="example-collapse-text">
                        <Form>
                            <Form.Control type="Number" placeholder="Enter the selling price in ether"/>
                            <br/><Button onClick={()=>
                            setLoading(false)}
                            //onclick function modify garnu parnae xa 
                            >Submit</Button>
                        </Form>
                    </div>
                    </Collapse>
            </Card>
            
    </div>
        </div>

    )

}
export default User;
