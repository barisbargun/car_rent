import { rateLimit } from 'express-rate-limit'
import { StatusCodes } from 'http-status-codes';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  statusCode:StatusCodes.TOO_MANY_REQUESTS
})
export default limiter;