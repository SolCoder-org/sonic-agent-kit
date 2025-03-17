import { SonicAgentKit } from '../agent';

declare global {
  namespace Express {
    interface Request {
      sonicAgent: SonicAgentKit;
      user?: any;
    }
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any[];
} 