import jwt from "jsonwebtoken";

const refreshTokenConfig = (id:string) => {
  return jwt.sign(
    { "id": id },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '12h' }
  )
};

export default refreshTokenConfig;