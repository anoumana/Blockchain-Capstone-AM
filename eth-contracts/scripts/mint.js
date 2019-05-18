const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
//const MNEMONIC = process.env.MNEMONIC
const MNEMONIC = "income just length prefer leisure fly speed obtain sting shift paper panic"
const INFURA_KEY = process.env.INFURA_KEY
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS
const OWNER_ADDRESS = process.env.OWNER_ADDRESS
const NETWORK = process.env.NETWORK
const TOKEN_ID = process.env.TOKEN_ID
const NUM_CREATURES = 10
const NUM_LOOTBOXES = 4
const DEFAULT_OPTION_ID = 0
const LOOTBOX_OPTION_ID = 2

if (!MNEMONIC || !INFURA_KEY || !OWNER_ADDRESS || !NETWORK) {
    console.error("Please set a mnemonic, infura key, owner, network, and contract address.")
    return
}

// const NFT_ABI = [{
//     "constant": false,
//     "inputs": [
//       {
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "name": "tokenId",
//         "type": "uint256"
//       }

//     ],
//     "name": "mint",
//     "outputs": [bool],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
// }]

const NFT_ABI = [{
  "constant": false,
  "inputs": [
    {
      "name": "to",
      "type": "address"
    },
    {
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "mint",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Creatures issued directly to the owner.
        for (var i = 0; i < NUM_CREATURES; i++) {
            const result = await nftContract.methods.mint(OWNER_ADDRESS, TOKEN_ID+i).send({ from: OWNER_ADDRESS });
            console.log("Minted creature. Transaction: " + result.transactionHash)
        }
    } 
}

main()