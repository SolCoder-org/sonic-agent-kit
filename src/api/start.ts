import app from './server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Sonic Agent Kit API server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log('Available endpoints:');
  console.log('  - POST /api/token/deploy - Deploy a new token');
  console.log('  - GET /api/token/balance/:mintAddress - Get token balance');
  console.log('  - GET /api/token/balances - Get all token balances');
  console.log('  - POST /api/token/transfer - Transfer tokens');
  console.log('  - POST /api/token/close-empty-accounts - Close empty token accounts');
  console.log('  - POST /api/nft/deploy-collection - Deploy a new NFT collection');
  console.log('  - POST /api/nft/mint - Mint an NFT to a collection');
  console.log('  - GET /api/wallet/address - Get wallet address');
  console.log('  - GET /api/wallet/balance - Get wallet balance');
  console.log('  - GET /api/wallet/balance/:address - Get balance of another wallet');
  console.log('  - POST /api/wallet/request-funds - Request funds from faucet');
  console.log('  - POST /api/game/rock-paper-scissors - Play Rock Paper Scissors');
  console.log('  - GET /api/game/tps - Get TPS (Transactions Per Second)');
  console.log('  - POST /api/image/create - Create an image using DALL-E');
}); 