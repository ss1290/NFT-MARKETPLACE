// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OpenMarket is ERC721 {
    using Counters for Counters.Counter;

    //   uint256[] tokenid;
    //   uint256[] costOftoken;
    //   mapping(uint256 => uint256) private costOf;
    //   mapping(address => uint256) private etherOf;

    mapping(uint =>bool ) private _tokenForSale;
    mapping(uint =>uint ) private _tokenPrice;

    Counters.Counter private _tokenIds;

    uint[] private totalTokens;

    constructor() ERC721("NFT TOKEN", "TFN") {}

    function mint() public
    {
        uint256 newItemId = _tokenIds.current();
        totalTokens.push(newItemId);
        _tokenIds.increment();
        _mint(msg.sender, newItemId);
    }
    function mintInBatch(uint256 noOfTokens) public {
        for(uint i=0;i<noOfTokens;i++) {
            uint256 newItemId = _tokenIds.current();
            totalTokens.push(newItemId);
            _tokenIds.increment();
            _mint(msg.sender, newItemId);
        }
    }
    function totalSupply() public view returns(uint256) {
        return totalTokens.length;
    }

    function setTokenForSale(uint tokenId, uint price) public {
        require(ownerOf(tokenId) == _msgSender(),"Only owner can set a token for sale!");
        require(_exists(tokenId),"Token does not exist!");
        _tokenForSale[tokenId] = true;
        _tokenPrice[tokenId] = price;
    }

    function changeTokenPrice(uint price, uint tokenId) public {
        require(_tokenForSale[tokenId],"Token is not for sale, set it sale first!");
        require(ownerOf(tokenId) == _msgSender(),"Only owner can set the value!");
        require(_exists(tokenId),"Token does not exist!");
        _tokenPrice[tokenId] = price;
    }

    function buyNFT(uint tokenId)public {
        require(_tokenForSale[tokenId],"Token is currently not for sale!");
        address owner = ownerOf(tokenId);
        require(_msgSender() != address(0),"Buyer address cannot be zero");
        require(_msgSender() != owner , "Cannot buy owned NFT");
        _transfer(owner,_msgSender(),tokenId);
        _tokenForSale[tokenId] = false;

        emit Transfer(owner,_msgSender(),tokenId);
    }

    function removeTokenFromSale(uint tokenId)public{
        require(_tokenForSale[tokenId],"Token is already set to not for sale");
        require(ownerOf(tokenId) == _msgSender(),"Only token owner can set value");
        require(_exists(tokenId),"Token does not exist");
        _tokenForSale[tokenId] = false;
    }

    function _transferFrom(address to, uint tokenId) internal {
        require(to != msg.sender , 'Can  not transfer to same address');
        require(to != address(0) , 'Can  not be zero address');
        require(_exists(tokenId),"No token  exists");
        
        transferFrom(msg.sender,to,tokenId);

    }

    function _apProve(address to , uint tokenId) internal {
        require(to != msg.sender , 'Can  not transfer to same address');
        require(to != address(0) , 'Can  not be zero address');
        require(_exists(tokenId),"No token exist");
        approve(to , tokenId);
    }


  

    //  function _transferFrom(address from, address to , uint256 tokenid) public payable {
    //     require(etherOf[to] >= costOf[tokenid], 'Low ether in buyers account');
    //     transferFrom(from,to,tokenid);
    //     etherOf[to]-=costOf[tokenid];
    //     etherOf[from]+=costOf[tokenid];
    // }

}
    // uint256 private tokenCounter;
    // constructor() ERC721("Kryptonion", "KN"){
    //     tokenCounter = 0;
    // }

    // function mint() public {
    //     uint256 newNFTTokenId = tokenCounter;
    //     _mint(msg.sender, newNFTTokenId);
    //     tokenCounter+=1;
    // }
// }