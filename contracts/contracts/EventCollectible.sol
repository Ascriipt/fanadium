// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EventCollectible is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("EventCollectible", "EVC") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function mintCollectible(address to, string memory tokenURI) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter++;
    }
}
