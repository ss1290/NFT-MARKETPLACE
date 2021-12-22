// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OpenMarket is ERC721 {
    using Counters for Counters.Counter;

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
