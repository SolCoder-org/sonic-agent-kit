import { Router, Request, Response } from 'express';
import { ApiResponse } from '../types';
import { PublicKey } from '@solana/web3.js';

const router: Router = Router();

/**
 * @swagger
 * /api/wallet/address:
 *   get:
 *     summary: Get wallet address
 *     description: Returns the wallet address of the Sonic Agent
 *     tags: [Wallet]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 */
// Get wallet address
router.get('/address', async (req: Request, res: Response) => {
  try {
    const address = req.sonicAgent.wallet_address.toString();

    res.json({
      success: true,
      data: {
        address
      }
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
});

/**
 * @swagger
 * /api/wallet/balance:
 *   get:
 *     summary: Get wallet balance
 *     description: Returns the SOL balance of the Sonic Agent's wallet
 *     tags: [Wallet]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 1.5
 */
// Get wallet balance
router.get('/balance', async (req: Request, res: Response) => {
  try {
    const balance = await req.sonicAgent.getBalance();

    res.json({
      success: true,
      data: {
        balance
      }
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
});

/**
 * @swagger
 * /api/wallet/balance/{address}:
 *   get:
 *     summary: Get balance of another wallet
 *     description: Returns the SOL balance of the specified wallet address
 *     tags: [Wallet]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Wallet address to check balance
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: number
 *                       example: 2.5
 */
// Get balance of another wallet
router.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const balance = await req.sonicAgent.getBalanceOther(new PublicKey(address));

    res.json({
      success: true,
      data: {
        balance
      }
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
});

/**
 * @swagger
 * /api/wallet/request-funds:
 *   post:
 *     summary: Request funds from faucet
 *     description: Requests SOL from the Sonic testnet faucet
 *     tags: [Wallet]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     signature:
 *                       type: string
 *                       example: "5UfgccJLvRPxJWGpyQAi6rXxq2CiJLYQZ5i7YTifmzPrKMWHMbsxA9KYRSXg5GZoFRNV7gTQdMWwmnAFJ5mKRUvS"
 */
// Request funds from faucet
router.post('/request-funds', async (req: Request, res: Response) => {
  try {
    const signature = await req.sonicAgent.requestFaucetFunds();

    res.json({
      success: true,
      data: {
        signature
      }
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
});

export default router; 