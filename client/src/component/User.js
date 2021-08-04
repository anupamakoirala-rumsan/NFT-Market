import React, { useEffect, useState,useRef } from "react";
import Nabbar from "./Nav";
import {Button, Card, Form,Collapse} from "react-bootstrap";
import logo from "../logo.svg";
import {useParams} from "react-router-dom";
import axios from "axios";


function User(props){
    const {id} = useParams();
    const firstcontract = props.firstcontract;
    const secondcontract = props.secondcontract;
    const [tokens,setTokens] =useState();
    const[tokendetail,setToken] = useState([]);
    const[loading,setLoading] = useState(false);
    const valueref = useRef();
    const gettokens = async()=>{
        try{
        //list the owned token
       var token = await firstcontract.methods.tokensofOwner(id).call();
        console.log(token);
        var details =[];
        setTokens(token);

        for (var i = 0;i< token.length;i++){
            const uri = await firstcontract.methods.tokenURI(token[i]).call();
            const url = `https://ipfs.io/ipfs/${uri}`;
            const detail = await axios.get(url).then(r=>r.data);
            details.push(detail);
        }
        setToken(details);}
        catch(err){
            console.log(err);
        }
    }
useEffect(()=>{
    gettokens();
},[])
    console.log(id);
    // console.log(account.id);
//place token for sale 
const handlesale = async(token_id,value)=>{
    value = props.web3.utils.toWei(value,"ether");
    //list the given token for sale by the owner
    const sellevent = await secondcontract.methods.listforsell(id).send({from:props.currentAccount,value:value});
    console.log(sellevent);
    //listen for sell event 
    const events = sellevent.events.listedforsale.returnValues[0];
    console.log(events);
    alert(value);
    setLoading(false);
}

//cancel the sale
const handlesalecancel = async(tokenid)=>{
    try{
    const sellcancel = await secondcontract.methods.cancelsell(id).send({from:props.currentAccount});
    console.log(sellcancel);
    alert("hhh");}
    catch(err){
        console.log(err);
    }

}

    return(
        <div className="userpage">
        <Nabbar
        currentAccount ={props.currentAccount}/>
        <div className="heading">
        <h3>Collectibles owned by you</h3>
        </div>
        <div className="display">
            {/* {tokendetail.map((detail,key)=>( */}

            <Card  className="displaycard">
           <span> <img src={logo}
            height="100"
            width="100"/></span>
            <span>Name:</span>
            <span>Tokenid:</span>
            <span>Price:50</span>
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
                            <Form.Control type="Number" placeholder="Enter the selling price in ether"
                            ref ={valueref}
                            />
                            <br/><Button onClick={(e)=>{
                                e.preventDefault();
                                const tokenid = 1;//need to change 
                                const value = valueref.current.value;
                                handlesale(tokenid,value)
                            
                            }}
                            //onclick function modify garnu parnae xa 
                            >Submit</Button>
                        </Form>
                    </div>
                    </Collapse>
                    <br/>

                    <Button onClick ={(e)=>{
                        e.preventDefault();
                        const tokenid = 1;
                        handlesalecancel(tokenid);
                    }}
                    
                    >Cancel the sell</Button>
            </Card>           
             {/* ))} */}

            
    </div>
        </div>

    )

}
export default User;
