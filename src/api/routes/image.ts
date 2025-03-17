import express, { Request, Response, Router, RequestHandler } from 'express';
import { ApiResponse } from '../types';
import { create_image } from '../../tools/agent';

const router: Router = express.Router();

/**
 * @swagger
 * /api/image/create:
 *   post:
 *     summary: Create image using DALL-E
 *     description: Generate an image using OpenAI's DALL-E model
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The image generation prompt
 *                 example: "A beautiful sunset over a mountain landscape"
 *               size:
 *                 type: string
 *                 description: Image size
 *                 enum: [256x256, 512x512, 1024x1024]
 *                 default: "1024x1024"
 *                 example: "1024x1024"
 *               n:
 *                 type: integer
 *                 description: Number of images to generate
 *                 default: 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Image generated successfully
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
 *                     urls:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-..."
 */
// Create image using DALL-E
router.post('/create', (async (req: Request, res: Response) => {
  try {
    const { prompt, size, n } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'Prompt is required'
      } as ApiResponse);
    }

    const result = await create_image(
      req.sonicAgent,
      prompt,
      size || '1024x1024',
      n || 1
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

export default router; 