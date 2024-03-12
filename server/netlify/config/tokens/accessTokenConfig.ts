import jwt from "jsonwebtoken";

const accessTokenConfig = (id:string, role:number) => {
  return jwt.sign({
    "UserInfo": {
      "id": id,
      "role": role
    }
  },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '30m' }

  )
}

export default accessTokenConfig;