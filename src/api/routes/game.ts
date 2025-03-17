import { Router, Request, Response, RequestHandler } from 'express';
import { ApiResponse } from '../types';

const router: Router = Router();

/**
 * @swagger
 * /api/game/rock-paper-scissors:
 *   post:
 *     summary: Play Rock Paper Scissors
 *     description: Play a game of Rock Paper Scissors with a bet amount
 *     tags: [Game]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - choice
 *               - amount
 *             properties:
 *               choice:
 *                 type: string
 *                 description: Your choice
 *                 enum: [rock, paper, scissors]
 *                 example: "rock"
 *               amount:
 *                 type: number
 *                 description: Amount to bet
 *                 example: 1
 *     responses:
 *       200:
 *         description: Game played successfully
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
 *                     playerChoice:
 *                       type: string
 *                       example: "rock"
 *                     compChoice:
 *                       type: string
 *                       example: "scissors"
 *                     result:
 *                       type: string
 *                       enum: [win, lose, draw]
 *                       example: "win"
 *                     payout:
 *                       type: number
 *                       example: 2
 *                     signature:
 *                       type: string
 *                       example: "5UfgccJLvRPxJWGpyQAi6rXxq2CiJLYQZ5i7YTifmzPrKMWHMbsxA9KYRSXg5GZoFRNV7gTQdMWwmnAFJ5mKRUvS"
 */
// Play Rock Paper Scissors
router.post('/rock-paper-scissors', (async (req: Request, res: Response) => {
  try {
    const { choice, amount } = req.body;
    
    if (!choice || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Choice and amount are required'
      } as ApiResponse);
    }
    
    if (!['rock', 'paper', 'scissors'].includes(choice)) {
      return res.status(400).json({
        success: false,
        message: 'Choice must be rock, paper, or scissors'
      } as ApiResponse);
    }

    const result = await req.sonicAgent.rockPaperScissors(
      amount,
      choice as 'rock' | 'paper' | 'scissors'
    );

    return res.json({
      success: true,
      data: result
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
 * /api/game/tps:
 *   get:
 *     summary: Get TPS
 *     description: Get the current Transactions Per Second of the Sonic blockchain
 *     tags: [Game]
 *     responses:
 *       200:
 *         description: TPS retrieved successfully
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
 *                     tps:
 *                       type: number
 *                       example: 1500
 */
// Get TPS (Transactions Per Second)
router.get('/tps', (async (req: Request, res: Response) => {
  try {
    const tps = await req.sonicAgent.getTPS();

    return res.json({
      success: true,
      data: {
        tps
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