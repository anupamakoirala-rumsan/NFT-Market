import React, { useEffect, useState } from "react";
import {Card ,Col,Row,Image,Button,Collapse,Form} from "react-bootstrap";
import Nabbar from "./Nav";
import Loader from "../utilities/Loader"
import {useHistory,useParams} from "react-router-dom";
import axios from "axios";
function Details(props){
    const {id} = useParams();
    const [owner,setOwner] = useState('');
    const[Loading,setLoading] = useState(false);
    const secondcontract = props.secondcontract;
    const firstcontract = props.firstcontract;
    const[data,setData] = useState({});
    const[artist,setArtist] = useState();
    const[timestamp,setTimestamp] = useState();
    // console.log(contract);
    const getdetails = async()=>{
        try{
            //identitfy the owner of the token 
        const owner = await firstcontract.methods.ownerOf(id).call();
        setOwner(owner);
        //obtain the URI of the token
        const uri = await firstcontract.methods.tokenURI(id).call();
        // console.log(uri);
        const url = `https://ipfs.io/ipfs/${uri}`;
        // console.log(url);
        const detail = await axios.get(url).then(r=>r.data);
        // console.log(detail);
        const dataStr = await secondcontract.methods.forsale(id).call();
        console.log(dataStr);
        // console.log(dataStr);
            // console.log(detail.properties.artist)

        setData({...detail});
        setArtist(detail.properties.artist);
        setTimestamp(detail.properties.timestamp);

    

        // const timestamp = Date.now();
        // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(timestamp));

    }
    catch(err){
    console.log(err);
}}
    useEffect(()=>{
        getdetails();
    })

    const[loading,setloading] = useState(false)
    return(
        <div className="detailspage">
            <Nabbar
            currentAccount ={props.currentAccount}/>
            <Loader
            loading={loading}/>
            <h3></h3>
            <div className ="details">
            <Card>
                <Row>
                <Col  xs ={5} md ={3}className="image">
                <span><Image src={data.image}
                 style={{maxWidth:'10rem'}}
                 rounded
                 /></span>
                 <br/>
                 <a href={data.image} target="_blank">View the art </a>
                </Col>
                {/* <div className="imagedetails"> */}
                <Col  xs={6} md ={9} className="artdetails">
                    <span>Name:{" "}{data.name}</span>
                    <br/>
                    Owner:<span>{" "}{owner}</span>                   
                    <br/>
                    <span>Token Id:{" "}{id}</span>
                    <br/>
                    <span>Artist:{" "}{artist}</span>
                    <br/>
                    <span>Uploaded Timestamp:{" "}{timestamp}
                        </span>
                    <br/>
                    <span>Price:{" "}</span>
                    <br/>
                    
                    <Button onClick={(event)=> 
                    setLoading(!Loading)
                    }
                        aria-controls ="example-collapse-text"
                        aria-expanded ={Loading}>Buy Token</Button>
                        <Collapse in={Loading}>
                    <div id="example-collapse-text">
                        <Form>
                            <Form.Control type="Number" placeholder="Enter the price in ether"/>
                            <br/><Button onClick={()=>
                            setLoading(false)}
                            //onclick function modify garnu parnae xa 
                            >Submit</Button>
                        </Form>
                    </div>
                    </Collapse>
                </Col>
                </Row>
            </Card>
        </div>
        </div>
    )
}
export default Details;