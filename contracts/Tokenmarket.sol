pragma solidity ^0.6.4;

import "./Token.sol";


contract Tokenmarket{
    
    address  payable seller;
    address  payable buyer;
    Token public tokens;
    
    enum  states {
        initial,
        sale
    }
    
    mapping(uint256 => states) forsale;//maps the tokenid with it's state
    mapping(uint256 => uint256) sellingprice; // maps the tokenid with it's selling price as added by the owner
    
    constructor ( Token _tokens) public {
         tokens = _tokens;
    }
     event listedforsale(uint256 tokenid, uint256 price , address issuer);
     event tokensold(uint256 id , address buyer );

     modifier paidenough(uint256 price){
        require(msg.value >= price,"Not sufficient price");
        
        _;
    }
    modifier refundexcess(uint256 price)   {
        if (msg.value > price)
        {
            uint256 return_value;
            return_value = msg.value -price;
            msg.sender.transfer(return_value);
        }
        _;
    }

     //to list the collectibles for sale by the owner ,contract(approved to sale token on behalf of owner)
    function listforsell(uint256 price,uint256 tokenid) public{
        require(price != 0,"Selling price cannot be zero");
        require(forsale[tokenid] != states.sale,"Token already in sale");
        require (tokens.getApproved(tokenid) == address(this),"Contract is not approved to sell the token");
        sellingprice[tokenid] = price;
        forsale[tokenid] = states.sale;
        listedforsale(tokenid, price ,address(this));

    }
    //buy the collectibles paying sufficient price as indicated
    function buytoken(uint256 tokenid) public  payable  paidenough (sellingprice[tokenid]) refundexcess(sellingprice[tokenid]){
        
        uint256 price = sellingprice[tokenid];
        require(forsale[tokenid] == states.sale,"Token is not forsale");
        require(price > 0, "not for sale");
        
        seller = payable(tokens.ownerOf(tokenid));
        seller.transfer(price);
       
        tokens.safeTransferFrom(seller,msg.sender,tokenid);
        tokensold(tokenid, msg.sender);
       
    }
    
    //dispaly the details of the collectibles
    function details(uint256 id) public  view returns( address _owner, string  memory tokenuri,states state,uint256 price){
        address owner = tokens.ownerOf(id);
        string memory uri = tokens.tokenURI(id);
        return(owner,uri,
        forsale[id],
        sellingprice[id]
        );
        
    }
    
    //remove the token form the sale list
    function cancelsell(uint256 tokenid) public {
        require(forsale[tokenid] == states.sale,"Token isnot for sale");
        require(msg.sender ==tokens.ownerOf(tokenid),"Only  Token owner can cancel the sell ");
        forsale[tokenid] = states.initial;
    }
    
} 
