import { Router } from "express";
import { createData, deleteData, getAllData, getData, patchData, moveData } from "@/controllers/shared";
import { CONTROLLER_ACTIONS } from "@/constants";
import { verifyAdminRole, verifyEditorRole } from "@/middleware/verifyRoles";
import { Model } from "mongoose";
import { getCurrentUser, getHeaderValueByIndex, getUsers, patchUser, patchSiteValue, getInfo } from "@/controllers/custom";
import { verifyJWT } from "@/middleware";
const router = Router();

const values = Object.values(CONTROLLER_ACTIONS);

type otherModelsProps = {
  parentModel?: Model<any>;
  childrenModel?: Model<any>;
}

const sharedRoutes = (values: number[], path: string, model: Model<any>, otherModels?: otherModelsProps) => {

  if (values.includes(1)) router.get(`/${path}`, (req, res) => getAllData(req, res, model))

  if (values.includes(2)) router.get(`/${path}/:id`, (req, res) => getData(req, res, model))

  if (values.includes(3)) router.post(`/${path}`, verifyJWT, verifyEditorRole,
    (req, res) => createData(req, res, model, otherModels?.parentModel))

  if (values.includes(4)) router.delete(`/${path}/:id`, verifyJWT, verifyEditorRole,
    (req, res) => deleteData(req, res, model, otherModels?.parentModel, otherModels?.childrenModel));

  if (values.includes(5)) router.patch(`/${path}`, verifyJWT, verifyEditorRole, (req, res) => moveData(req, res, model));

  if (values.includes(6)) router.patch(`/${path}/:id`, verifyJWT, verifyEditorRole,
    (req, res) => patchData(req, res, model, otherModels?.parentModel))

  /**
   * 
   * CUSTOM ROUTES
   * 
   */

  if (values.includes(7)) router.patch(`/${path}/:id`, verifyJWT, verifyAdminRole,
    (req, res) => patchData(req, res, model))

  if (values.includes(8)) router.get(`/current-user`, verifyJWT, (req, res) => getCurrentUser(req, res, model));

  if (values.includes(9)) router.delete(`/${path}/:id`, verifyJWT, verifyAdminRole,
    (req, res) => deleteData(req, res, model));

  if (values.includes(10)) router.post(`/${path}`, verifyJWT, verifyAdminRole,
    (req, res) => createData(req, res, model))

  if (values.includes(11)) router.get(`/${path}`, verifyJWT, (req, res) => getHeaderValueByIndex(req, res, model))
  if (values.includes(12)) router.get(`/${path}`, verifyJWT, verifyAdminRole, (req, res) => getUsers(req, res, model))

  if (values.includes(13)) router.patch(`/${path}/:id`, verifyJWT, (req, res) => patchUser(req, res, model))
  if (values.includes(14)) router.patch(`/${path}`, verifyJWT, verifyAdminRole, (req, res) => patchSiteValue(req, res, model))
}

for (let i = 0; i < values.length; i++) {
  const path = values[i].path;
  const model = values[i].model;
  const parentModel = values[i].parentModel;
  const childrenModel = values[i].childrenModel;

  router.get(`/info`, verifyJWT, (req, res) => getInfo(req, res))

  if (values[i].path == CONTROLLER_ACTIONS.SITE_VALUES.path) {
    sharedRoutes([1, 2, 14], path, model);
  }

  else if (values[i].path == CONTROLLER_ACTIONS.USER.path) {
    sharedRoutes([8, 9, 10, 12, 13], path, model);
  }

  else if (values[i].path == CONTROLLER_ACTIONS.SERVICE.path) {
    sharedRoutes([1, 2, 5, 6, 9, 10], path, model)
  }

  else if (values[i].path == CONTROLLER_ACTIONS.HEADER.path) {
    sharedRoutes([1, 7, 10, 11], path, model)
  }

  else sharedRoutes([1, 2, 3, 4, 5, 6], path, model, { parentModel, childrenModel });
}



export default router;