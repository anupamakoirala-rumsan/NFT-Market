import React, { useState } from "react";
import {Card ,Col,Row,Image,Button} from "react-bootstrap";
import Nabbar from "./Nav";
import Loader from "../utilities/Loader"
function Details(){
    const[loading,setloading] = useState(true)
    return(
        <div className="detailspage">
            <Nabbar/>
            <Loader
            loading={loading}/>
            <h3></h3>
            <div className ="details">
            <Card>
                <Row>
                <Col  xs ={5} md ={3}className="image">
                <Image src="https://ipfs.io/ipfs/QmdzUHJcyUGDMp8Hy6HkrFoTmBAb7k1wibGZKFJy8u5Y8T"
                 style={{maxWidth:'10rem',maxHeight:"80%"}}
                 rounded
                 />
                 <a href='/'>View the art </a>
                </Col>
                {/* <div className="imagedetails"> */}
                <Col  xs ={4} md ={6} className="artdetails">
                    <label>Name:</label>
                    <br/>
                    <label>Owner:</label>                    
                    <br/>
                    <label>Token Id:</label>
                    <br/>
                    <label>Artist:</label>
                    <br/>
                    <label>Uploaded Timestamp:</label>
                    <br/>
                    <label>Price:</label>
                    <br/>
                    
                    <Button>Buy</Button>
                </Col>
                {/* </div> */}
                </Row>
            </Card>
        </div>
        </div>
    )
}
export default Details;