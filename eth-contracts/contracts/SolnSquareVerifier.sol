pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./verifier.sol";


contract SolnSquareVerifier is AMKaasu, Verifier {
// TODO define a solutions struct that can hold an index & an address
   struct solutions  {
        uint256 index;
        address solnAddress;
    }

//TODO define an array of the above struct
  solutions[] solnArray;

//TODO define a mapping to store unique solutions submitted
  mapping(bytes32 => bool) uniqueSolnsSubmitted;

//TODO Create an event to emit when a solution is added
  event SolutionAdded(bytes32 key, uint256 index, address solnAddress);


//TODO Create a function to add the solutions to the array and emit the event
  function addSolution(bytes32 _key, uint256 _index, address _solnAddress) internal {
    solnArray.push(
        solutions ({index : _index,
                    solnAddress: _solnAddress
                    })
    );
    uniqueSolnsSubmitted[_key] = true;
    emit SolutionAdded(_key, _index, _solnAddress);
  }

// TODO Create a function to mint new NFT only after the solution has been verified
  function mintThyToken(
            address to,
            uint256 tokenId,
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input
        ) public returns (bool) {

        bool minted = false;
        // generate the key
        bytes32 proofKey = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        
        //  - make sure the solution is unique (has not been used before)
        //  - make sure you handle metadata as well as tokenSuplly
        require(uniqueSolnsSubmitted[proofKey] == false, "Solution used before");

//        try{
            // verify proof
            bool proved = verifyTx(a, a_p, b, b_p, c, c_p, h, k, input);
            require(proved  == true, "Not proved");
            // mint the token
            mint(to, tokenId);
            // add solution
            addSolution(proofKey, tokenId, msg.sender);
            minted = true;
//        } 


        return minted;

  }
}






