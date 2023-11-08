import { Router } from "express";

import userController from "../app/controllers/user.c.js";
import authenticationMiddleware from "../middleware/authentication.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: /user
 *   description: API for user's actions
 */

/**
 * @swagger
 * /user/{id}:
 *  get:
 *   summary: get user's profile
 *   tags: [/user]
 *   security:
 *     - tokenAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       type: string
 *       description: User's ID
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '404':
 *       $ref: '#/components/responses/404'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.get("/:id", authenticationMiddleware.verifyToken, userController.getProfile);

/**
 * @swagger
 * /user/{id}:
 *  post:
 *   summary: update user's profile
 *   tags: [/user]
 *   security:
 *     - tokenAuth: []
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
 *             name:
 *               type: string
 *               description: user's name
 *             phone:
 *               type: string
 *               description: user's phone
 *             email:
 *               type: string
 *               description: user's email
 *           example:
 *             name: Updated Test Account 01
 *             phone: "0123456788"
 *             email: updated_account01@gmail.com
 *   responses:
 *     '200':
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInfo'
 *     '404':
 *       $ref: '#/components/responses/404'
 *     '500':
 *       $ref: '#/components/responses/500'
 */
router.post("/:id", authenticationMiddleware.verifyToken, userController.updateProfile);

export default router;
