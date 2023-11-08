import { Router } from "express";

import authController from "../app/controllers/auth.c.js";
import authenticationMiddleware from "../middleware/authentication.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: /auth
 *   description: API for user's authentication
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: user register
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: user's name
 *             phone:
 *               type: string
 *               description: user's phone
 *             email:
 *               type: string
 *               description: user's email
 *             password:
 *               type: string
 *               description: user's password
 *           example:
 *             name: Test Account 01
 *             phone: "0123456789"
 *             email: account01@gmail.com
 *             password: account01
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Register successfully!
 *     '409':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: 409 Email/Phone already exists!
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: user login
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: user's email or phone
 *             password:
 *               type: string
 *               description: user's password
 *           example:
 *             username: account01@gmail.com
 *             password: account01
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: JWT access token
 *               refreshToken:
 *                 type: string
 *                 description: JWT refresh token
 *     '401':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: 401 Wrong password!
 *     '404':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: 404 Username doesn't exist!
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/refresh:
 *  post:
 *   summary: user request a new refresh token
 *   tags: [/auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *               description: user's refresh token
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accessToken:
 *                 type: string
 *                 description: JWT access token
 *               refreshToken:
 *                 type: string
 *                 description: JWT refresh token
 *     '401':
 *       $ref: '#/components/responses/401'
 *     '403':
 *       $ref: '#/components/responses/404'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/refresh", authController.requestNewRefreshToken);

/**
 * @swagger
 * /auth/logout/{id}:
 *  post:
 *   summary: user logout
 *   tags: [/auth]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: string
 *       description: User's ID
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             refreshToken:
 *               type: string
 *               description: user's refresh token
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Log out successfully!
 *     '400':
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Log out unsuccessfully!
 *     '401':
 *       $ref: '#/components/responses/401'
 *     '403':
 *       $ref: '#/components/responses/403'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/logout/:id", authenticationMiddleware.verifyToken, authController.logout);

export default router;
