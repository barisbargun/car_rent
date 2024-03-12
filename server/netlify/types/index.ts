import { Model } from "mongoose";

/**
 * For CONTROLLER_ACTIONS
 * 
 * Path is the url path and model is the mongodb model
 */

export interface IController {
  path: string;
  model: Model<any>;
  parentModel?: Model<any>;
  childrenModel?: Model<any>;
}
