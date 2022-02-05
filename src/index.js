const { Contract, providers, Wallet, ContractFactory, utils } = require('ethers')
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const csv = fs.readFileSync(path.resolve(__dirname, 'users.csv'))
const addresses = csv.toString().split('\n')


const BatchTransferJson = require('../abi/BatchTransfer1155.json')

const provider = new providers.JsonRpcProvider(process.env.INFURA_URL)
const wallet = new Wallet(process.env.OWNER_PRIVATE_KEY, provider)

async function main() {
// set these
const batchTransferAddress = ""
const nftContract = ""
// UPDATE
const tokenIdToSend = "0"

const BatchTransfer = new Contract(
    batchTransferAddress,
    BatchTransferJson.abi,
    wallet
)

var addressList = []
for (var i = 0; i < addresses.length; i++) {
    addressList.push(addresses[i]);
}

console.log("Addresses to send to: ", addressList)
console.log("Token Id sending:", tokenIdToSend)


console.log("Sending..")

const batchSubmitTx = await BatchTransfer.batchTransfer(nftContract, addressList, tokenIdToSend)
await batchSubmitTx.wait()

console.log("Sent", batchSubmitTx.hash)
}
main()





