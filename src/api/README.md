# Sonic Agent Kit API

This API provides RESTful endpoints for interacting with the Sonic Agent Kit. It allows you to perform various blockchain operations on the Solana network without having to write code.

## Getting Started

1. Set up your environment variables in a `.env` file:
```
SOLANA_PRIVATE_KEY=your_private_key
RPC_URL=https://api.testnet.sonic.game
OPENAI_API_KEY=your_openai_api_key
```

2. Start the API server:
```bash
pnpm run start-api
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Available Endpoints

### Token Operations

- **POST /api/token/deploy** - Deploy a new token
  ```json
  {
    "name": "My Token",
    "symbol": "MTK",
    "uri": "https://example.com/metadata.json",
    "decimals": 9,
    "initialSupply": 1000000
  }
  ```

- **GET /api/token/balance/:mintAddress** - Get token balance for a specific token

- **GET /api/token/balances** - Get all token balances for the wallet

- **POST /api/token/transfer** - Transfer tokens
  ```json
  {
    "destination": "recipient_wallet_address",
    "amount": 100,
    "mint": "token_mint_address" // Optional, if not provided, transfers SOL
  }
  ```

- **POST /api/token/close-empty-accounts** - Close empty token accounts

### NFT Operations

- **POST /api/nft/deploy-collection** - Deploy a new NFT collection
  ```json
  {
    "name": "My NFT Collection",
    "uri": "https://example.com/collection-metadata.json",
    "royaltyBasisPoints": 500, // 5%
    "creators": [
      {
        "address": "creator_wallet_address",
        "share": 100
      }
    ]
  }
  ```

- **POST /api/nft/mint** - Mint an NFT to a collection
  ```json
  {
    "collectionMint": "collection_mint_address",
    "name": "My NFT",
    "uri": "https://example.com/nft-metadata.json",
    "recipient": "recipient_wallet_address" // Optional
  }
  ```

### Wallet Operations

- **GET /api/wallet/address** - Get wallet address

- **GET /api/wallet/balance** - Get wallet SOL balance

- **GET /api/wallet/balance/:address** - Get SOL balance of another wallet

- **POST /api/wallet/request-funds** - Request funds from faucet

### Game Operations

- **POST /api/game/rock-paper-scissors** - Play Rock Paper Scissors
  ```json
  {
    "choice": "rock", // or "paper" or "scissors"
    "amount": 1 // Amount to bet
  }
  ```

- **GET /api/game/tps** - Get TPS (Transactions Per Second)

### Image Operations

- **POST /api/image/create** - Create an image using DALL-E
  ```json
  {
    "prompt": "A beautiful sunset over a mountain landscape",
    "size": "1024x1024", // Optional
    "n": 1 // Optional, number of images to generate
  }
  ```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data specific to the endpoint
  }
}
```

Or in case of an error:

```json
{
  "success": false,
  "message": "Error message"
}
``` 