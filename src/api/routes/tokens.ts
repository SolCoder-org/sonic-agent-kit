import { Router, Request, Response, RequestHandler } from 'express';
import { ApiResponse } from '../types';
import { PublicKey } from '@solana/web3.js';

const router: Router = Router();

/**
 * @swagger
 * /api/token/deploy:
 *   post:
 *     summary: Deploy a new token
 *     description: Creates a new SPL token on the Solana blockchain
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - symbol
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the token
 *                 example: "My Token"
 *               symbol:
 *                 type: string
 *                 description: The symbol of the token
 *                 example: "MTK"
 *               uri:
 *                 type: string
 *                 description: URI to the token metadata
 *                 example: "https://example.com/metadata.json"
 *               decimals:
 *                 type: integer
 *                 description: Number of decimal places
 *                 default: 9
 *                 example: 9
 *               initialSupply:
 *                 type: integer
 *                 description: Initial supply of tokens
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Token deployed successfully
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
 *                     mint:
 *                       type: string
 *                       example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 */
// Deploy a new token
router.post('/deploy', (async (req: Request, res: Response) => {
  try {
    const { name, symbol, uri, decimals, initialSupply } = req.body;
    
    if (!name || !symbol) {
      return res.status(400).json({
        success: false,
        message: 'Name and symbol are required'
      } as ApiResponse);
    }

    const result = await req.sonicAgent.deployToken(
      name,
      uri || '',
      symbol,
      decimals || 9,
      initialSupply
    );

    return res.json({
      success: true,
      data: {
        mint: result.mint.toString(),
      }
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
}) as unknown as RequestHandler);

/**
 * @swagger
 * /api/token/balance/{mintAddress}:
 *   get:
 *     summary: Get token balance
 *     description: Returns the balance of a specific token
 *     tags: [Token]
 *     parameters:
 *       - in: path
 *         name: mintAddress
 *         required: true
 *         schema:
 *           type: string
 *         description: The mint address of the token
 *     responses:
 *       200:
 *         description: Token balance retrieved successfully
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
 *                       example: 1000
 *                     name:
 *                       type: string
 *                       example: "My Token"
 *                     symbol:
 *                       type: string
 *                       example: "MTK"
 *                     decimals:
 *                       type: integer
 *                       example: 9
 */
// Get token balance
router.get('/balance/:mintAddress', (async (req: Request, res: Response) => {
  try {
    const { mintAddress } = req.params;
    const tokenBalances = await req.sonicAgent.getTokenBalances();
    
    // Find the specific token in the returned balances
    const token = tokenBalances.tokens.find(
      t => t.tokenAddress === mintAddress
    );

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token not found'
      } as ApiResponse);
    }

    return res.json({
      success: true,
      data: {
        balance: token.balance,
        name: token.name,
        symbol: token.symbol,
        decimals: token.decimals
      }
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
}) as unknown as RequestHandler);

/**
 * @swagger
 * /api/token/balances:
 *   get:
 *     summary: Get all token balances
 *     description: Returns balances of all tokens in the wallet
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: Token balances retrieved successfully
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
 *                     tokens:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tokenAddress:
 *                             type: string
 *                             example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *                           balance:
 *                             type: number
 *                             example: 1000
 *                           name:
 *                             type: string
 *                             example: "My Token"
 *                           symbol:
 *                             type: string
 *                             example: "MTK"
 *                           decimals:
 *                             type: integer
 *                             example: 9
 */
// Get all token balances
router.get('/balances', (async (req: Request, res: Response) => {
  try {
    const tokenBalances = await req.sonicAgent.getTokenBalances();
    
    return res.json({
      success: true,
      data: tokenBalances
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
}) as unknown as RequestHandler);

/**
 * @swagger
 * /api/token/transfer:
 *   post:
 *     summary: Transfer tokens
 *     description: Transfers tokens or SOL to another wallet
 *     tags: [Token]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination
 *               - amount
 *             properties:
 *               destination:
 *                 type: string
 *                 description: Recipient wallet address
 *                 example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *               amount:
 *                 type: number
 *                 description: Amount to transfer
 *                 example: 100
 *               mint:
 *                 type: string
 *                 description: Token mint address (if not provided, transfers SOL)
 *                 example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *     responses:
 *       200:
 *         description: Transfer completed successfully
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
// Transfer tokens
router.post('/transfer', (async (req: Request, res: Response) => {
  try {
    const { destination, amount, mint } = req.body;
    
    if (!destination || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Destination and amount are required'
      } as ApiResponse);
    }

    const result = await req.sonicAgent.transfer(
      new PublicKey(destination),
      amount,
      mint ? new PublicKey(mint) : undefined
    );

    return res.json({
      success: true,
      data: {
        signature: result
      }
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
}) as unknown as RequestHandler);

/**
 * @swagger
 * /api/token/close-empty-accounts:
 *   post:
 *     summary: Close empty token accounts
 *     description: Closes all empty token accounts to reclaim rent
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: Empty accounts closed successfully
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
 *                     closedAccounts:
 *                       type: integer
 *                       example: 3
 */
// Close empty token accounts
router.post('/close-empty-accounts', (async (req: Request, res: Response) => {
  try {
    const result = await req.sonicAgent.closeEmptyTokenAccounts();

    return res.json({
      success: true,
      data: {
        signature: result.signature,
        closedAccounts: result.size
      }
    } as ApiResponse);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    } as ApiResponse);
  }
}) as unknown as RequestHandler);

export default router;
