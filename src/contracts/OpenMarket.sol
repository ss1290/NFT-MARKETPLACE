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

    mapping(uint =>bool ) public forsale;
    mapping(uint =>uint ) public costOftoken;

    Counters.Counter private _tokenIds;

    string[] public colors ;

    mapping(string => bool) private _tokenExists ;

    uint[] private totalTokens;

    constructor() ERC721("NFT TOKEN", "TFN") {}

    function mint( string memory _color) public
    {
        require(!_tokenExists[_color] , "NFT Token already Exists");
        colors.push(_color);

        uint256 _id = colors.length -1 ;
         totalTokens.push(_id);
        _mint(msg.sender,_id);
        forsale[_id] = false;
    }




    function mintInBatch(uint256 noOfTokens) public {
        for(uint i=0;i<noOfTokens;i++) {
            uint256 _id = _tokenIds.current();
            totalTokens.push(_id);
            _tokenIds.increment();
            _mint(msg.sender, _id);
        }
    }
    function totalSupply() public view returns(uint256) {
        return totalTokens.length;
    }

    function tokenforsale(uint tokenId, uint price) public {
        require(ownerOf(tokenId) == _msgSender(),"Not owner");
        require(_exists(tokenId),"Token not exist");
        forsale[tokenId] = true;
        costOftoken[tokenId] = price;
    }

    function priceChange(uint price, uint tokenId) public {
          require(ownerOf(tokenId) == _msgSender(),"Not owner");
          require(_exists(tokenId),"Token not exist");
          costOftoken[tokenId] = price;
    }

    function buyNFT(uint tokenId)public {
        address owner = ownerOf(tokenId);
        require(_msgSender() != address(0),"Buyer address zero");
        require(_msgSender() != owner , "Transfer to owner");
        _tokenApprovals[tokenId] = _msgSender();
        transferFrom(owner, _msgSender(), tokenId);
        _tokenApprovals[tokenId] = address(0);
    }

    function removeFromSale(uint tokenId)public{
        require(ownerOf(tokenId) == _msgSender(),"Not owner");
        require(_exists(tokenId),"Token not exist");
        forsale[tokenId] = false;
        costOftoken[tokenId] = 0;
    }

function _TransferFrom(address to, uint tokenId) public{
     require(to != msg.sender , 'Can  not transfer to same address');
     require(to != address(0) , 'Can  not be zero address');
     require(_exists(tokenId),"Not not exist");
     
      transferFrom(msg.sender,to,tokenId);

 }

 function _Approve(address to , uint tokenId) public {
      require(to != msg.sender , 'Can  not transfer to same address');
     require(to != address(0) , 'Can  not be zero address');
      require(_exists(tokenId),"Not not exist");
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