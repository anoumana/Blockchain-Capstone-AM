
// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
var SolnSquareVerifierComplete = artifacts.require('SolnSquareVerifier');

const zokratesProof = require("../../zokrates/code/square/proof.json");

contract('Test SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('Verified Mintable Tests', function () {
        beforeEach(async function () {
            this.contract = await SolnSquareVerifierComplete.new({from: account_one});
        })

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
            let verifyCheck = [];
            let result = await this.contract.mintThyToken(
                account_two
                , 1
                , zokratesProof.proof.A
                , zokratesProof.proof.A_p
                , zokratesProof.proof.B
                , zokratesProof.proof.B_p
                , zokratesProof.proof.C
                , zokratesProof.proof.C_p
                , zokratesProof.proof.H
                , zokratesProof.proof.K
                , zokratesProof.input
                , {from: account_one});

                result.logs.forEach( (item, index) =>  { 
                    verifyCheck[item.event] = true;
                    console.log("Event :" + item.event); 
                        }
                    );

               
        })

        
    })
}) 