import jwt from "jsonwebtoken";

const authenticationMiddleware = {
  // verify token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("403 Token isn't valid!");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("401 You're not authenticated!");
    }
  },
};

export default authenticationMiddleware;
