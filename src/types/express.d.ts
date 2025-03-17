import { SonicAgentKit } from '../agent';

declare global {
  namespace Express {
    interface Request {
      sonicAgent: SonicAgentKit;
    }
  }
} 