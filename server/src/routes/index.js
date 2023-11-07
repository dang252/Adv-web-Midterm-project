import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import swaggerOptions from "../config/swagger.js";
import authRouter from "./auth.r.js";
import userRouter from "./user.r.js";

const swaggerDocs = swaggerJSDoc(swaggerOptions);

function router(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  /**
   * @swagger
   *  components:
   *    securitySchemes:
   *      cookieAuth:
   *        type: apiKey
   *        in: cookie
   *        name: refreshToken
   *      tokenAuth:
   *        type: apiKey
   *        in: header
   *        name: token
   *    responses:
   *      '401':
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *              example: 401 Unauthorized!
   *      '403':
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *              example: 403 Forbidden!
   *      '404':
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *              example: 404 Not Found!
   *      '409':
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *              example: 409 Conflict!
   *      '500':
   *        content:
   *          application/json:
   *            schema:
   *              type: string
   *              example: 500 Internal Server Error!
   *    schemas:
   *      UserInfo:
   *        type: object
   *        properties:
   *          name:
   *            type: string
   *            description: user's name
   *          phone:
   *            type: string
   *            description: user's phone
   *          email:
   *            type: string
   *            description: user's email
   */
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
}

export default router;
