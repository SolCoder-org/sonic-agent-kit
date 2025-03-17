import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'express-async-errors';
import { SonicAgentKit } from '../agent';
import { 
  tokenRoutes, 
  nftRoutes, 
  walletRoutes, 
  gameRoutes, 
  imageRoutes 
} from './routes';
import { specs, swaggerUi } from './swagger';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize Sonic Agent Kit
const sonicAgent = new SonicAgentKit(
  process.env.SOLANA_PRIVATE_KEY!,
  process.env.RPC_URL || 'https://api.testnet.sonic.game',
  {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  }
);

// Pass the agent instance to routes
app.use((req: Request, res: Response, next: NextFunction) => {
  req.sonicAgent = sonicAgent;
  next();
});

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/token', tokenRoutes);
app.use('/api/nft', nftRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/image', imageRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; 