import * as dotenv from "dotenv";
dotenv.config();

const allowedOrigins = [process.env.BASE_URL]



export default allowedOrigins;