// used by requests i.e GET that requires a logged in user
//https://blog.webdevsimplified.com/2019-12/express-middleware-in-depth/

import jsonwebtoken from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const headerData = req.headers["authorization"];

  const token = headerData.split(" ")[1];

  // verify the token
  const isVerified = jsonwebtoken.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
  );

  if (!isVerified) {
    throw "Something went wrong";
  }

  if (isVerified) {
    req.user = isVerified.userId;
    next();
  }
}
