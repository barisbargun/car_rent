import { CorsOptions } from "cors";
import allowedOrigins from "./allowedOrigins";

const corsOptions:CorsOptions = {
  origin:(origin:any, callback:CallableFunction) => {
    if(allowedOrigins.indexOf(origin) !== -1 ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus:200
};

export default corsOptions;