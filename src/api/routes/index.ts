import express from 'express';
import tokenRoutes from './tokens';
import nftRoutes from './nfts';
import walletRoutes from './wallet';
import gameRoutes from './game';
import imageRoutes from './image';

// Export all routes
export {
  tokenRoutes,
  nftRoutes,
  walletRoutes,
  gameRoutes,
  imageRoutes
}; 