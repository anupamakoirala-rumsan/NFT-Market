pragma solidity ^0.6.4;
 
 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC721/ERC721.sol";
 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/utils/Counters.sol";
 contract Token is ERC721{
     using Counters for Counters.Counter;
     Counters.Counter public tokenIds;
     
     constructor(string memory _name, string memory _symbol)  public ERC721(_name, _symbol){
     }
     
     event NFTminted(address owner, uint256 id);
    
    
     //mint the collectibles
     function mintNft(address reciever, string memory metadata ) external {
        uint256 id = tokenIds.current();
        _mint(reciever,id);
        _setTokenURI(id,metadata);
        tokenIds.increment();
        NFTminted(reciever,id);
         
     }
     //display the tokens belonging to the particular owner
     function tokensofOwner(address _owner) external view  returns(uint256[] memory){
         uint256 _total = tokenIds.current();
         uint256 numTokens = balanceOf(_owner);
         uint256[] memory owner_token  = new uint256[](numTokens);
         uint256 resultindex =0;
        for(uint256 i = 0; i<_total; i++){
            if(ownerOf(i) == _owner)
            {
                owner_token[resultindex]=i;
                resultindex ++;
            }
        }
        return owner_token; 
     }
     
 }