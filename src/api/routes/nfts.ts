import { Router, Request, Response, RequestHandler } from 'express';
import { ApiResponse } from '../types';
import { PublicKey } from '@solana/web3.js';

const router: Router = Router();

/**
 * @swagger
 * /api/nft/deploy-collection:
 *   post:
 *     summary: Deploy a new NFT collection
 *     description: Creates a new NFT collection on the Solana blockchain
 *     tags: [NFT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - uri
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the collection
 *                 example: "My NFT Collection"
 *               uri:
 *                 type: string
 *                 description: URI to the collection metadata
 *                 example: "https://example.com/collection-metadata.json"
 *               royaltyBasisPoints:
 *                 type: integer
 *                 description: Royalty percentage in basis points (100 = 1%)
 *                 example: 500
 *               creators:
 *                 type: array
 *                 description: List of creator addresses and their share percentages
 *                 items:
 *                   type: object
 *                   properties:
 *                     address:
 *                       type: string
 *                       example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *                     share:
 *                       type: integer
 *                       example: 100
 *     responses:
 *       200:
 *         description: Collection deployed successfully
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
 *                     collectionAddress:
 *                       type: string
 *                       example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *                     signature:
 *                       type: string
 *                       example: "5UfgccJLvRPxJWGpyQAi6rXxq2CiJLYQZ5i7YTifmzPrKMWHMbsxA9KYRSXg5GZoFRNV7gTQdMWwmnAFJ5mKRUvS"
 */
// Deploy a new NFT collection
router.post('/deploy-collection', (async (req: Request, res: Response) => {
  try {
    const { name, uri, royaltyBasisPoints, creators } = req.body;
    
    if (!name || !uri) {
      return res.status(400).json({
        success: false,
        message: 'Name and URI are required'
      } as ApiResponse);
    }

    const result = await req.sonicAgent.deployCollection({
      name,
      uri,
      royaltyBasisPoints,
      creators
    });

    return res.json({
      success: true,
      data: {
        collectionAddress: result.collectionAddress.toString(),
        signature: result.signature
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
 * /api/nft/mint:
 *   post:
 *     summary: Mint NFT to a collection
 *     description: Mints a new NFT to an existing collection
 *     tags: [NFT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - collectionMint
 *               - name
 *               - uri
 *             properties:
 *               collectionMint:
 *                 type: string
 *                 description: The mint address of the collection
 *                 example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *               name:
 *                 type: string
 *                 description: The name of the NFT
 *                 example: "My NFT #1"
 *               uri:
 *                 type: string
 *                 description: URI to the NFT metadata
 *                 example: "https://example.com/nft-metadata.json"
 *               recipient:
 *                 type: string
 *                 description: Recipient wallet address (optional, defaults to caller)
 *                 example: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
 *     responses:
 *       200:
 *         description: NFT minted successfully
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
 *                     metadata:
 *                       type: string
 *                       example: "5UfgccJLvRPxJWGpyQAi6rXxq2CiJLYQZ5i7YTifmzPrKMWHMbsxA9KYRSXg5GZoFRNV7gTQdMWwmnAFJ5mKRUvS"
 */
// Mint NFT to a collection
router.post('/mint', (async (req: Request, res: Response) => {
  try {
    const { collectionMint, name, uri, recipient } = req.body;
    
    if (!collectionMint || !name || !uri) {
      return res.status(400).json({
        success: false,
        message: 'Collection mint address, name, and URI are required'
      } as ApiResponse);
    }

    const result = await req.sonicAgent.mintNFT(
      new PublicKey(collectionMint),
      {
        name,
        uri,
      },
      recipient ? new PublicKey(recipient) : undefined
    );

    return res.json({
      success: true,
      data: {
        mint: result.mint.toString(),
        metadata: result.metadata.toString()
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
