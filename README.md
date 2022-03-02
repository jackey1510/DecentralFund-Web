# DecentralFund-web

A web3 application for decentralized crowdfunding built with Next.js and Web3.js

The smart contract allows user to create a decentralized crowdfunding campaign.

The manager can create "Request" to transfer money from the campaign.

The contributors can vote to approve/decline the Request, which can help prevent rigged/poorly managed campaign.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`CONTRACT_ADDRESS` The campaign factory contract address

`WEB3_PROVIDER_URL` URL of Web 3 provider e.g. Infura

## Run Locally

Install dependencies

```bash
  yarn
```

Run Locally

```bash
  yarn dev
```
