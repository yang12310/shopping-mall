
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token)
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }


    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //다음 미들웨어로 보내기 위햏서는 반드시 필요함
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
