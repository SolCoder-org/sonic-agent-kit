import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'sonic-agent-kit-secret',
  environment: process.env.NODE_ENV || 'development',
  rpcUrl: process.env.RPC_URL || 'https://api.testnet.sonic.game',
  privateKey: process.env.SOLANA_PRIVATE_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
}; 