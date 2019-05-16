var ERC721MintableComplete = artifacts.require('AMKaasu');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            var mintedTokens = [];
            await mintedTokens.push(this.contract.mint(account_two,100 ));
            await mintedTokens.push(this.contract.mint(account_two,200 ));
            await mintedTokens.push(this.contract.mint(account_two,300 ));
            await mintedTokens.push(this.contract.mint(account_three,400 ));
            await mintedTokens.push(this.contract.mint(account_three,500 ));
            await mintedTokens.push(this.contract.mint(account_three,600 ));
            await mintedTokens.push(this.contract.mint(account_three,700 ));
            await mintedTokens.push(this.contract.mint(account_four,800 ));
            await mintedTokens.push(this.contract.mint(account_four,900 ));

        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call({from:account_two});;
            console.log("Total supply :" + totalSupply);
            assert.equal(totalSupply, 9, "Total supply didnt match");

        })

        it('should get token balance', async function () { 

            let addr = await this.contract.ownerOf(900);
            console.log("address :" + addr);

            let acct_two_balance = await this.contract.balanceOf.call(account_two);
            let acct_three_balance = await this.contract.balanceOf.call(account_three);

            console.log("Acct Two balance :" + acct_two_balance);
            assert.equal(acct_two_balance,3,"Token balance for account two didnt match")

           console.log("Acct Three balance :" + acct_three_balance);
           assert.equal(acct_three_balance,4,"Token balance for account three didnt match")
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURIForAcctTwo = await this.contract.tokenURI(300);
            console.log("Acct Two URI :" + tokenURIForAcctTwo);
            assert.equal(tokenURIForAcctTwo, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/300', 'TokenURI for 300 didnt match')
           
        })

        it('should transfer token from one owner to another', async function () { 
            // transfer from acct 3 to 4
            await this.contract.transferFrom(account_two, account_three, 300, {from: account_two});

            let addr = await this.contract.ownerOf(300);
            console.log("owner address :" + addr);
           
            assert.equal(addr,account_three,"Transfer to acct three didnt happen")

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let mintable = true;
            try {
                await this.contract.mint(account_two,12, {from: accounts[4]} );

            } catch (exception ) {
                console.log("Error in mint not contract owner :" + exception);
                mintable = false;
            }
            assert.equal(mintable,false, "Able to mint by not being a contract owner");
        })

        it('should return contract owner', async function () {
            let contractOwner =  await this.contract.getOwner();
            assert.equal(accounts[0], contractOwner, "Contract owner is not acct 0");
        })

    });
})